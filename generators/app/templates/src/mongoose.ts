import * as mongoose from 'mongoose';
import { ImageProcessError } from './components/utils';
import * as config from './config';

export class Image extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, 'Image');
  }

  // `cast()` takes a parameter that can be anything. You need to
  // validate the provided `val` and throw a `CastError` if you
  // can't convert it.
  cast(val) {
    if (!val) {
      throw new ImageProcessError();
    }
    return val;
  }
}

export function setupMongoose() {
  mongoose.Schema.Types['Image'] = Image;
  mongoose.connect(config.mongo.uri, config.mongo.options);
  mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });
}