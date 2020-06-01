import { Request } from 'koa';

export interface BetterRequest extends Request {
  files: any;
  fields: any;
  qs: any;
  user: any;
}