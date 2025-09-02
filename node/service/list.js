
const Joi = require('joi');
const resJson = require('@/common/json');
const ValidationError = Joi.ValidationError
const record = require('@/dao/record');
const sequelize = require('sequelize');
const Op = sequelize.Op;

exports.list = async (ctx, next) => {
    const schema = Joi.object({
        keywords: Joi.string().max(30).min(0),
        page: Joi.object({
            pageSize: Joi.number().max(200).min(1).required(),
            pageNum: Joi.number().max(9999).min(1).required()
        }).required()
    }).required()
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error);
    }
    let where = {
        [Op.or]: [
            {
                projectName: { [Op.like]: `%${valid.value.keywords ? valid.value.keywords : ""}%` }
            },
            {
                error: { [Op.like]: `%${valid.value.keywords ? valid.value.keywords : ""}%` }
            }
        ]
    }

    const res = await record.findAndCountAll({
        attributes: ['id', 'ip', 'projectName', 'projectVersion', 'error', 'breadcrumbs', 'createdAt'],
        where,
        order: [['createdAt', 'DESC']],
        offset: (valid.value.page.pageNum - 1) * valid.value.page.pageSize,
        limit: valid.value.page.pageSize
    })
    ctx.body = resJson.successMsg(res);
}


exports.add = async (ctx, next) => {
    const schema = Joi.object({
        projectName: Joi.string().max(100),
        projectVersion: Joi.string().max(100),
        error: Joi.object().required(),
        breadcrumbs: Joi.array(),
    })
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error)
    }
    await record.create(Object.assign({}, ctx.request.body, { ip: ctx.state.ip }))
    ctx.body = resJson.successMsg();
}

exports.del = async (ctx, next) => {
    const schema = Joi.object({
        id: Joi.number().min(1).required()
    }).required()
    const valid = schema.validate(ctx.request.body)
    if (valid.error) {
        throw new ValidationError(valid.error)
    }
    await record.destroy({ where: { id: valid.value.id } })
    ctx.body = resJson.successMsg();
}