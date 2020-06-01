import { IRouterContext } from 'koa-router';
import model from './model';
import * as Utils from '../../components/utils';
import * as sharp from 'sharp';
import * as mongoose from 'mongoose';

class Controller extends Utils.Controller {
  // Gets a list of Models
  public async index(ctx: Utils.BetterContext) {
    try {
      let paginateResult = await Utils.paginate(this.model, ctx);
      ctx.status = 200;
      ctx.body = paginateResult;
    } catch (e) {
      Utils.handleError(ctx, e);
    }
  }

  // Gets a single Model from the DB
  public async show(ctx: Utils.BetterContext) {
    try {
      let entity = await Utils.show(this.model, ctx);
      Utils.validateEntity(entity);
      ctx.status = 200;
      ctx.body = entity;
    } catch (e) {
      Utils.handleError(ctx, e);
    }
  }

  // Creates a new Model in the DB
  public async create(ctx: Utils.BetterContext) {
    try {
      delete ctx.request.fields._id;
      let entity = await this.model.create(ctx.request.fields)
      ctx.status = 201;
      ctx.body = entity;
    } catch (e) {
      Utils.handleError(ctx, e);
    }
  }

  // Updates an existing Model in the DB
  public async update(ctx: Utils.BetterContext) {
    try {
      delete ctx.request.fields._id;
      let entity = await this.model.findById(ctx.params.id).exec();
      Utils.validateEntity(entity);
      Utils.patchUpdates(entity, ctx.request.fields);
      await entity.save();
      ctx.status = 200;
      ctx.body = entity;
    } catch (e) {
      Utils.handleError(ctx, e);
    }
  }

  // Deletes a Model from the DB
  async destroy(ctx: Utils.BetterContext): Promise<any> {
    try {
      let entity = await this.model.findById(ctx.params.id).exec();
      Utils.validateEntity(entity);
      await entity.remove();
      ctx.status = 204;
      ctx.body = '';
    } catch (e) {
      Utils.handleError(ctx, e);
    }
  }
}

export default new Controller(model)
