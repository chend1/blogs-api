const Joi = require('joi')

const articleClassSchema = {
  sort: Joi.number().allow(null, ''),
  name: Joi.string().required().error(new Error('分类名称不能为空')),
  status: Joi.number().required().error(new Error('分类状态不能为空')),
  description: Joi.string().allow(null, ''),
  parent_id: Joi.number().allow(null, ''),
}

const editAarticleClassSchema = {
  sort: Joi.number().allow(null, ''),
  name: Joi.string().required().error(new Error('分类名称不能为空')),
  status: Joi.number().required().error(new Error('分类状态不能为空')),
  description: Joi.string().allow(null, ''),
  parent_id: Joi.number().allow(null, ''),
  id: Joi.number().required().error(new Error('id不能为空')),
}

const deleteAarticleClassSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

module.exports = {
  articleClassSchema,
  editAarticleClassSchema,
  deleteAarticleClassSchema
}