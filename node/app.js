import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const baseEnv = path.resolve(process.cwd(), `.env.${env}`);
const localEnv = path.resolve(process.cwd(), `.env.${env}.local`);

dotenv.config({ path: baseEnv });
dotenv.config({ path: localEnv, override: true });

import 'module-alias/register';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const handleError = require('@/common/utils').handleError;
const app = new Koa();
const verToken = require('@/common/utils').verToken;
const resJson = require('@/common/json')
const noLoginList = require('@/config/config').noLoginList;
const roleRoutes = require('@/config/config').roleRoutes;

app.use(async (ctx, next) => {
    let ip = ctx.request.header['x-real-ip'] || ctx.request.ip;
    ip = ip.replace('::ffff:', '')
    ctx.state.ip = ip
    await next()

})

//错误捕获中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err);
        handleError(err, ctx)
    }
})

//bodyParser
app.use(bodyParser({
    strict: false
}))

//验证token
app.use(async (ctx, next) => {
    if (!noLoginList.includes(ctx.path)) {
        const token = ctx.request.headers.token;
        if (token) {
            const decoded = await verToken(token);
            ctx.state.username = decoded.username;
            ctx.state.id = decoded.id;
            ctx.state.isAdmin = decoded.isAdmin;
            await next();
        } else {
            ctx.body = resJson.tokenError;
        }
    } else {
        await next()
    }
})

//鉴权
app.use(async (ctx, next) => {
    if (roleRoutes.includes(ctx.path)) {
        if (ctx.state.isAdmin) {
            await next();
        } else {
            ctx.body = resJson.ruleError();
        }
    } else {
        await next();
    }
})


//用户
app.use(require('@/routes/user.js').routes())
//记录
app.use(require('@/routes/list.js').routes())

app.use(require('@/routes/404.js').routes())

app.listen(9066);