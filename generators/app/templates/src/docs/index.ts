import * as koa from 'koa';
import * as serve from 'koa-static';
import * as mount from 'koa-mount';
import * as path from 'path'
import * as config from '../config'

export function setupDocs(app: koa) {
    const docsPath = path.join(config.root, 'swagger-ui')
    app.use(mount('/api-docs/', new koa().use(serve(docsPath))));
    const tmpDocsPath = path.join(config.root, 'tmp', 'swagger-ui')
    app.use(mount('/api-docs/', new koa().use(serve(tmpDocsPath))));
}