
exports.successMsg = (data) => {
    return ({
        code: 0,
        msg: "操作成功",
        data: data
    })
}

exports.tokenError = {
    code: 100,
    msg: "请重新登录！"
}

exports.ruleError = () => {
    return {
        code: 102,
        msg: "您没有权限！",
    }
}

exports.unknowError = (msg) => {
    return ({
        code: 200,
        msg: "错误：" + String(msg),
    })
}

exports.flowError = (msg) => {
    return ({
        code: 201,
        msg: String(msg),
    })
}

exports.paramError = (msg) => {
    return ({
        code: 202,
        msg: '请提交正确的表单：' + String(msg),
    })
}

exports.ban = {
    code: 300,
    msg: "你已经被禁止访问！请规范行为！"
}