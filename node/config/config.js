
//token 私钥
exports.tokenSecret = 'kZBrpDtFESc2kZBraWWkZ21312312BkZBrppDtFESc2jxYaWWkZBkZBrp7jxY7dskZBkZBrpDaWWkZBkZBrptFESc2jxY7rpDtFESc2jxY7adNHWPsdaWWkZBkZBrpDtFESc2jxY7rpDtFESc2jxY7KdasdJx7pYaWWkZBkZBr'

//token 过期时间
exports.tokenTime = '12h'

exports.noLoginList = [
    '/login',
    '/record/add',
]

//邮箱配置
exports.emailConfig = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM
}

exports.roleRoutes = [
    '/ip/add',
    '/ip/delete',
    '/user/list',
    '/user/add',
    '/user/delete',
    '/user/edit',
]
