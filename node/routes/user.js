
const router = require('koa-router')();
const userService = require('@/service/user');
// router.prefix('/admin')

router.post('/login', userService.login)
router.post('/getUserInfo', userService.getUserInfo)
router.post('/changePassword', userService.changePassword)
router.post('/user/list', userService.list)
router.post('/user/add', userService.add)
router.post('/user/del', userService.del)
router.post('/user/edit', userService.edit)
router.post('/user/resetPassword', userService.resetPassword)

module.exports = router