import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';

export default mongoose.model('Log',
  new mongoose.Schema({
    content: String,
    time: Date,
    smiles: Boolean
  })
    .plugin(paginate)
);