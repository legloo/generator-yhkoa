import * as koa from 'koa';
import * as Router from 'koa-router';
import * as path from 'path';
import * as fs from 'fs';
import { setupAuth } from './auth'

export function setupRouters(app: koa) {
  const apiDir = path.join(__dirname, 'api')
  fs.readdir(apiDir, (error, dirs) => {
    if (error) return console.error(error);
    dirs.forEach(dir => {
      if (/^\./.test(dir)) return;
      fs.stat(`${apiDir}/${dir}/router.js`, (error, stat) => {
        if (error) return;
        if (stat.isFile()) {
          let router: Router = require(`./api/${dir}/router`).default;
          app.use(router.routes());
        }
      });
    });
  });

  setupAuth(app);
}
