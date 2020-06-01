import * as koa from 'koa';
import * as Router from 'koa-router';
import * as controller from './controller';
import {isAuthenticated} from '../service';
import Auth from '../model';
import { setup } from './passport';

let router = new Router({
    prefix: '/api/auth/local'
});

router.post('/', controller.signIn)
router.post('/signup', controller.signUp)
router.post('/reset', isAuthenticated(), controller.reset)

export function setupAuthLocal(app: koa) {
    setup(Auth);
    app.use(router.routes());
}
