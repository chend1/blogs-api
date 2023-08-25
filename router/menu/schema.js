const Joi = require('joi')

const menuSchema = {
  menu_name: Joi.string().required().error(new Error('姓名不能为空')),
  path: Joi.string().required().error(new Error('访问路径不能为空')),
  status: Joi.number(),
  icon: Joi.string().allow(null, ''),
  parent_id: Joi.number(),
  sort: Joi.number().allow(null, ''),
}

const editMenuSchema = {
  menu_name: Joi.string().required().error(new Error('姓名不能为空')),
  path: Joi.string().required().error(new Error('访问路径不能为空')),
  status: Joi.number(),
  icon: Joi.string().allow(null, ''),
  parent_id: Joi.number(),
  id: Joi.number().required(),
  sort: Joi.number().allow(null, ''),
}

const deleteMenuSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}


module.exports = {
  menuSchema,
  editMenuSchema,
  deleteMenuSchema
}