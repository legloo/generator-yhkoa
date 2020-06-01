import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';

export default mongoose.model('Sample',
  new mongoose.Schema({
    name: String,
    info: String
  })
    .plugin(paginate)
);