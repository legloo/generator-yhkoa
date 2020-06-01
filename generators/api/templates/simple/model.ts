import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';

export default mongoose.model('<%= className %>',
  new mongoose.Schema({
    name: String,
    info: String,
    active: Boolean
  })
    .plugin(paginate)
);