import * as passport from 'koa-passport'
import { signToken } from '../service'
import Auth from '../../api/user/model';
import * as Utils from '../../components/utils'
import * as config from '../../config'
import { EntityNotFoundError, ValidationError, getErrorStatusCode } from '../../components/utils'

export async function signIn(ctx: Utils.BetterContext) {
  try {
    let user: any = await Auth.findOne({
      username: ctx.request.fields.username
    }).exec();
    console.log('user=>>>>>>',user);
    if (!user) {
      throw new Utils.AuthError('This username is not registered');
    }
    let authenticated = await user.authenticate(ctx.request.fields.password);
    if (!authenticated) {
      throw new Utils.AuthError('This password is not correct');
    } else {
      const token = signToken(user._id, user.roles);
      ctx.body = { token };
    }
  } catch (e) {
    Utils.handleError(ctx, e);
  }
}

export async function signUp(ctx: Utils.BetterContext) {
  try {
    console.log(ctx.request.fields);
    let newUser = new Auth(ctx.request.fields);
    console.log('newUser=>>>',newUser);
    newUser['roles'] = config.auth.roles.default;
    await newUser.save();
    const token = signToken(newUser._id, newUser['roles']);
    ctx.status = 200;
    ctx.body = { token };
  } catch (e) {
    Utils.handleError(ctx, e)
  }
}

export async function reset(ctx: Utils.BetterContext) {
  const oldPass = String(ctx.request.fields.oldPassword)
  const newPass = String(ctx.request.fields.newPassword)

  try {
    let user = await Auth.findById(ctx.user._id).exec()
    Utils.validateEntity(user)
    let authenticated = await user['authenticate'](oldPass);
    if (!authenticated) {
      throw new Utils.AuthError();
    }
    user['password'] = newPass;
    await user.save();
    ctx.status = 204;
    ctx.body = '';
  } catch (e) {
    Utils.handleError(ctx, e)
  }

}
