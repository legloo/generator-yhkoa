import * as _ from 'lodash';
import { Document } from 'mongoose';
import { PaginateModel, PaginateOptions, PaginateResult } from 'mongoose-paginate';
import { BetterContext } from '../';

export function paginate(model: PaginateModel<Document>, ctx: BetterContext, filters?: any, options?: PaginateOptions): Promise<PaginateResult<Document>> {
  let _filters = {}
  let _options: PaginateOptions = {}

  if (filters) {
    _filters = _.merge(_filters, filters)
  }

  if (options) {
    _options = _.merge(_options, options)
  }

  if (ctx.request.query._filters) {
    let reqFilters = JSON.parse(ctx.request.query._filters)
    _filters = _.merge(_filters, reqFilters)
  }

  if (ctx.request.query._options) {
    let reqOptions = JSON.parse(ctx.request.query._options)
    _options = _.merge(_options, reqOptions)
  }

  return model.paginate(_filters, _options)
}