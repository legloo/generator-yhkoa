import { Context } from 'koa';
import { getErrorStatus, getErrorStatusCode } from '../';
import Boom = require('boom');

export function handleError(ctx: any, error: Error, statusCode: number = 500): void {
  if (error instanceof Error) {
    let json: any = {
      name: error.name,
      message: error.message
    };
    // boom.
    console.log('error=>>>>>>>>>>>>>>',error);
    let be: Boom = getErrorStatus(error);
    // be.output.payload.details = {
    //   name: error.name
    // };
    //   let errors = (<any>error).errors;
    //   if (errors) be.output.payload.details.errors = errors;

    // ctx.status = getErrorStatusCode(error);
    // ctx.body = JSON.stringify(json);
    // } else {
    //   be = boom.wrap(error, 500);
    ctx.status = be.output.statusCode;
    ctx.body = be.output.payload;
  }

}