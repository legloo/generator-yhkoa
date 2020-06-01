import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';
import { mongooseImages } from '../../components/utils';
import { root } from '../../config';
import { io } from './socket';

export default mongoose.model('<%= className %>',
  new mongoose.Schema({
    name: String,
    info: String,
    active: Boolean,
    image: mongoose.Schema.Types['Image']
  })
    .plugin(paginate)
    .plugin(mongooseImages, { 
      baseDir: root + '/static/media',
      generateUrl: (baseUrl, path) => {
        return '/static/media/' + path;
      }
    })
    .post('save', function(doc) {
      io.save(doc);
    })
    .post('remove', function(doc) {
      io.remove(doc);
    })
);