
const router = require('koa-router')();
const listService = require('@/service/list');
router.prefix('/record')

router.post('/list', listService.list)
router.post('/add', listService.add)
router.post('/del', listService.del)


module.exports = router