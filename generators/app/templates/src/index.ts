import * as mongoose from 'mongoose';
(<any>mongoose).Promise = global.Promise;
import * as koa from 'koa';
import * as logger from 'koa-logger';
import * as favicon from 'koa-favicon';
import * as convert from 'koa-convert';
import * as body from 'koa-better-body';
import * as qs from 'qs';
import * as serve from 'koa-static';
import * as mount from 'koa-mount';
import * as session from 'koa-session-minimal';
import * as store from 'koa-generic-session-mongo';
import * as compress from 'koa-compress';
import * as conditional from 'koa-conditional-get';
import * as etag from 'koa-etag';
import * as config from './config';
import { setupRouters } from './router';
import { setupMongoose } from './mongoose';
import { setupDocs } from './docs';
import { setupSocket } from './socket';

// Connect to MongoDB
setupMongoose();

export const app: koa = new koa();

app.use(logger());

app.use(favicon(config.root + '/static/favicon.ico'));

app.use(convert(body({
  querystring: qs
})));

app.use(session({
  key: config.secrets.session,
  store: new store()
}));

app.use(compress());

app.use(conditional());

app.use(etag());

setupSocket(app)

setupRouters(app);

setupDocs(app);
console.log(config.root);
app.use(mount('/static', new koa().use(serve(config.root + '/static'))));

app.listen(3000);
console.log('started')


