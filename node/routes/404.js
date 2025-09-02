const router = require('koa-router')();

router.post('/*', (ctx, next) => {
    ctx.body = {
        code: 404,
        msg: '接口不存在'
    }
})

module.exports = router