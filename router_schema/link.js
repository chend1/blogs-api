const Joi = require('joi')

const linkSchema = {
  title: Joi.string().required().error(new Error('名称不能为空')),
  link: Joi.string().required().error(new Error('友情链接不能为空')),
  sort: Joi.number().allow(null, ''),
  status: Joi.number(),
}

const editLinkSchema = {
  title: Joi.string().required().error(new Error('名称不能为空')),
  link: Joi.string().required().error(new Error('友情链接不能为空')),
  sort: Joi.number().allow(null, ''),
  status: Joi.number(),
  id: Joi.number().required().error(new Error('id不能为空')),
}

const deleteLinkSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

module.exports = {
  linkSchema,
  editLinkSchema,
  deleteLinkSchema
}