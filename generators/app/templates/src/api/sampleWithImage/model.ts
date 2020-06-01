import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';
import { mongooseImages } from '../../components/utils';
import { root } from '../../config';

export default mongoose.model('Samplewithimage',
  new mongoose.Schema({
    name: String,
    image: {
      type: mongoose.Schema.Types['Image']
    }


  })
    .plugin(paginate)
    .plugin(mongooseImages, { 
      baseDir: root + '/static/media',
      generateUrl: (baseUrl, path) => {
        return '/static/media/' + path;
      }
    })
);