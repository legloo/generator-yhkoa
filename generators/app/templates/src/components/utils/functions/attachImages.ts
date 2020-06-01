import * as sharp from 'sharp';
import { BetterContext } from '../';
import { root } from '../../../config';

export async function attachImages(ctx: BetterContext, options: any): Promise<void> {
  for (let key of Object.keys(ctx.request.fields)) {
    if(ctx.request.fields[key].contructor === File) {
      let meta = await sharp(ctx.request.fields[key].path).metadata();
      let image = {
        tmp: ctx.request.fields[key].path,
        path: 'abc'
      }
    }
  }
}