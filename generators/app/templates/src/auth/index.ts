import * as koa from 'koa';
import * as passport from 'koa-passport';
import { setupAuthLocal } from './local';

// Passport Configuration
// require('./local/passport').setup(Auth)
// require('./mobile/wechat/passport').setup(Auth)
// require('./google/passport').setup(User, config)
// require('./twitter/passport').setup(User, config)
// require('./qq/passport').setup(User, config)




// router.use('/local', require('./local').default)
// router.use('/mobile/wechat', require('./mobile/wechat').default)
// router.use('/oauth2/wechat', require('./oauth2/wechat').default)
// router.use('/twitter', require('./twitter').default)
// router.use('/google', require('./google').default)
// router.use('/qq', require('./qq').default)

// router.use('/token', require('./token').default)

export function setupAuth(app: koa) {
    app.use(passport.initialize())
    setupAuthLocal(app);

    passport.serializeUser(function (user, done) {
        console.log('se')
        done(null, user['_id']);
    });

    passport.deserializeUser(function (user, done) {
        console.log('dese')
        done(null, user);
    });
}