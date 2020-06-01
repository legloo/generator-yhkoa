import { IRouterContext } from 'koa-router';
import { BetterRequest } from './'

export interface BetterContext extends IRouterContext {
  user?:any;
  request: BetterRequest;
  session: any;
}