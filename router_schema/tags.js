const Joi = require('joi')

const tagSchema = {
  name: Joi.string().required().error(new Error('标签名不能为空')),
  sort: Joi.number().allow(null, ''),
  status: Joi.number(),
}

const editTagSchema = {
  name: Joi.string().required().error(new Error('标签名不能为空')),
  sort: Joi.number().allow(null, ''),
  status: Joi.number(),
  id: Joi.number().required().error(new Error('id不能为空')),
}

const deleteTagSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

module.exports = {
  tagSchema,
  editTagSchema,
  deleteTagSchema
}