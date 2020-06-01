import * as _ from 'lodash';
import * as passport from 'koa-passport';
import * as config from '../config';
import * as jwt from 'jsonwebtoken';
import * as compose from 'koa-compose';
import Auth from '../api/user/model';
import * as Utils from '../components/utils';

export function signToken(id, roles, providers?) {
  return jwt.sign({ _id: id, roles: roles, providers: providers }, config.secrets.session, {
    expiresIn: config.auth.expires
  })
}

async function validateToken(ctx: Utils.BetterContext, next) {
  try {
    if (!ctx.headers.authorization || !ctx.headers.authorization.startsWith('Bearer '))
      throw new Utils.AuthError('invalid token');
    let token = ctx.headers.authorization.replace('Bearer ', '');
    ctx.user = await new Promise((resolve, reject) => {
      jwt.verify(token, config.secrets.session, (error, decoded) => {
        if (error) {
          reject(new Utils.AuthError('invalid token'));
        } else {
          resolve(decoded);
        }
      });
    });
    await next();
  } catch (e) {
    Utils.handleError(ctx, e);
  }
}

async function validateUser(ctx: Utils.BetterContext, next) {
  try {
    let user = await Auth.findById(ctx.user._id).exec();
    if (!user) {
      throw new Utils.EntityNotFoundError('Invalid user id');
    };
    ctx.user = user;
    await next();
  } catch (e) {
    Utils.handleError(ctx, e);
  }
}

export function isAuthenticated() {
  return compose([
    validateToken,
    validateUser
  ]);
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set')
  }

  return compose([
    isAuthenticated(),
    async (ctx: Utils.BetterContext, next) => {
      try {
        if (!!~ctx.user.roles.indexOf(roleRequired) || !!~ctx.user.roles.indexOf('super')) {
          await next();
        } else {
          throw new Utils.PermissonError('you do not have sufficient privilege to perform this action');
        }
      } catch (e) {
        Utils.handleError(ctx, e);
      }
    }
  ])
}

/*
 * Checks if the user role meets the minimum requirements of the route or matches req.params.id
 */
export function OwnsOrHasRole(roleRequired, model, field) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set')
  }

  if (!roleRequired) {
    throw new Error('Required role needs to be set')
  }

  return compose([
    isAuthenticated(),
    async (ctx: Utils.BetterContext, next) => {
      try {
        if (!!~ctx.user.roles.indexOf(roleRequired) || !!~ctx.user.roles.indexOf('super')) {
          ctx.user.hasRole = true;
        }
        if (ctx.user._id == ctx.params.id) {
          ctx.user.owns = true;
        }
        if (!ctx.user.owns) {
          if (!model) throw Error();
          let entity = await model.findById(ctx.params.id, field).exec();
          Utils.validateEntity(entity);
          if (entity[field]._id == ctx.user._id) {
            ctx.user.owns = true;
          }
        }
        if (!ctx.user.hasRole && !ctx.user.owns) {
          throw new Utils.PermissonError('you do not have sufficient privilege to perform this action');
        }
        await next();
      } catch (e) {
        Utils.handleError(ctx, e);
      }
    }
  ])
}

export function appendUser() {
  return async function (ctx: Utils.BetterContext, next) {
    try {
      if (!ctx.headers.authorization || !ctx.headers.authorization.startsWith('Bearer '))
        throw new Utils.AuthError('invalid token');
      let token = ctx.headers.authorization.replace('Bearer ', '');
      ctx.user = await new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.session, (error, decoded) => {
          if (error) {
            reject(new Utils.AuthError('invalid token'));
          } else {
            resolve(decoded);
          }
        });
      });
      await next();
    } catch (e) {
      await next();
    }
  }
}
