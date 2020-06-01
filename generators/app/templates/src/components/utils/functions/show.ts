import * as _ from 'lodash';
import { Model, Document } from 'mongoose';
import { PaginateOptions } from 'mongoose-paginate';
import { BetterContext } from '../';

export function show(model: Model<Document>, ctx: BetterContext, options?: PaginateOptions): Promise<Document> {
  let _options: PaginateOptions = {}

  if (options) {
    _options = _.merge(_options, options)
  }

  if (ctx.request.query._options) {
    try {
      let reqOptions = JSON.parse(ctx.request.query._options)
      _options = _.merge(_options, reqOptions)
    } catch (error) {
      return Promise.reject({
        name: error.name,
        message: error.message
      })
    }
  }

  let query = model.findById(ctx.params.id)
  if (_options.select) query = query.select(_options.select)
  if (_options.populate) query = query.populate(_options.populate)

  return query.exec()
}