

const user = require('@/dao/user');
const Joi = require('joi');
const resJson = require('@/common/json');
const ValidationError = Joi.ValidationError
const record = require('@/dao/record');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { setToken, logFormat, md2 } = require('@/common/utils')

//登录
exports.login = async (ctx, next) => {
    const schema = Joi.object({
        username: Joi.string().regex(/^[a-zA-Z0-9]+$/).required().min(3).max(20),
        password: Joi.string().required().min(8).max(20)
    }).required();
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    const { username, password } = valid.value;
    const res = await user.findOne({
        where: {
            username,
            password: md2(password)
        }
    });
    if (res) {
        ctx.state.id = res.id;
        ctx.state.username = res.username;
        ctx.state.log = logFormat(ctx, "访问日志", res.username + "登录成功")
        ctx.body = resJson.successMsg({
            token: await setToken(res.username, res.id, res.isAdmin)
        })
    } else {
        ctx.body = resJson.flowError('账号或者密码错误！')
    }
}

//根据token获取用户信息
exports.getUserInfo = async (ctx, next) => {
    const res = await user.findOne({
        where: {
            username: ctx.state.username,
        }
    });
    ctx.body = resJson.successMsg({
        username: res.username,
        isAdmin: res.isAdmin
    })
}

//修改密码
exports.changePassword = async (ctx, next) => {
    const schema = Joi.object({
        oldPassword: Joi.string().required().min(8).max(20),
        newPassword: Joi.string().required().min(8).max(20)
    }).required();
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    const { oldPassword, newPassword } = valid.value;
    const res = await user.findOne({
        where: {
            username: ctx.state.username,
            password: md2(oldPassword)
        }
    });
    if (res) {
        await user.update({
            password: md2(newPassword)
        }, {
            where: {
                username: ctx.state.username
            }
        })
        ctx.body = resJson.successMsg('修改成功！')
        ctx.state.log = logFormat(ctx, "操作日志", "修改密码成功")
    } else {
        ctx.body = resJson.flowError('原密码错误！')
        ctx.state.log = logFormat(ctx, "操作日志", "修改密码失败")
    }
}

//查询所有用户列表
exports.list = async (ctx, next) => {
    const schema = Joi.object({
        keywords: Joi.string().max(30).min(0),
        page: Joi.object({
            pageSize: Joi.number().max(200).min(1).required(),
            pageNum: Joi.number().max(9999).min(1).required()
        })
    }).required()
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    let where = {
        [Op.or]: [
            {
                username: { [Op.like]: `%${valid.value.keywords ? valid.value.keywords : ""}%` }
            }
        ]
    }
    const res = await user.findAndCountAll({
        attributes: ['id', 'username', 'email', 'isAdmin', 'createdAt'],
        where,
        limit: valid.value.page.pageSize,
        offset: (valid.value.page.pageNum - 1) * valid.value.page.pageSize,
        order: [['id', 'DESC']]
    })
    ctx.body = resJson.successMsg(res)
}

//添加用户
exports.add = async (ctx, next) => {
    const schema = Joi.object({
        username: Joi.string().regex(/^[a-zA-Z0-9]+$/).required().min(3).max(20),
        password: Joi.string().required().min(8).max(20),
        email: Joi.string().email().max(30),
        isAdmin: Joi.boolean()
    }).required();
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    //验证用户名是否重复
    const one = await user.findOne({
        where: {
            username: valid.value.username
        }
    })
    if (one) {
        throw new ValidationError('此用户已存在！');
    }
    const res = await user.create(ctx.request.body)
    if (res) {
        ctx.state.log = logFormat(ctx, "操作日志", "添加用户" + valid.value.username + "成功")
        ctx.body = resJson.successMsg('添加成功！')
    } else {
        ctx.state.log = logFormat(ctx, "操作日志", "添加用户" + valid.value.username + "失败", true)
        ctx.body = resJson.flowError('添加失败！')
    }
}

//删除用户
exports.del = async (ctx, next) => {
    const schema = Joi.object({
        //排除id为1的超级管理员
        id: Joi.number().required().min(2)
    }).required();
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    const res = await user.destroy({
        where: {
            id: valid.value.id
        }
    })
    if (res) {
        //删除相关记录
        const recordRes = await record.destroy({
            where: {
                userId: valid.value.id
            }
        })
        if (recordRes) {
            ctx.state.log = logFormat(ctx, "操作日志", "删除用户成功,id:" + valid.value.id + ",此用户相关数据已被删除！")
            ctx.body = resJson.successMsg('删除成功,此用户相关数据已被删除！')
        } else {
            ctx.state.log = logFormat(ctx, "操作日志", "删除用户成功,id:" + valid.value.id + ",此用户相关数据删除失败！", true)
            ctx.body = resJson.flowError('删除成功,此用户相关数据删除失败！')
        }

    }
}

//修改用户
exports.edit = async (ctx, next) => {
    const schema = Joi.object({
        id: Joi.number().required().min(2),
        username: Joi.string(),
        email: Joi.string().email(),
        isAdmin: Joi.boolean()
    }).required();
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    const { id, email, isAdmin, username } = valid.value
    const res = await user.update({ id, email, isAdmin }, {
        where: {
            id: valid.value.id
        }
    })
    if (res) {
        ctx.state.log = logFormat(ctx, "操作日志", "修改用户" + username + "成功")
        ctx.body = resJson.successMsg('修改成功！')
    } else {
        ctx.state.log = logFormat(ctx, "操作日志", "修改用户" + username + "失败", true)
        ctx.body = resJson.flowError('修改失败！')
    }
}

//重置密码
exports.resetPassword = async (ctx, next) => {
    const schema = Joi.object({
        id: Joi.number().required().min(2),
        password: Joi.string().required().min(8).max(20)
    }).required();
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    const res = await user.update({
        password: md2(valid.value.password)
    }, {
        where: {
            id: valid.value.id
        }
    })
    if (res) {
        ctx.state.log = logFormat(ctx, "操作日志", "重置用户密码成功,id:" + valid.value.id)
        ctx.body = resJson.successMsg('重置密码成功！')
    } else {
        ctx.state.log = logFormat(ctx, "操作日志", "重置用户密码失败,id:" + valid.value.id, true)
        ctx.body = resJson.flowError('重置密码失败！')
    }
}
