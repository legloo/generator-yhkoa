import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';
import { io } from './socket';

export default mongoose.model('Samplewithsocket',
  new mongoose.Schema({
    name: String,
    info: String
  })
    .plugin(paginate)
    .post('save', function(doc) {
      io.save(doc);
    })
    .post('remove', function(doc) {
      io.remove(doc);
    })
);