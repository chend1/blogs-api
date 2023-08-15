const Joi = require('joi')

const roleSchema = {
  role_name: Joi.string().required().error(new Error('姓名不能为空')),
  role_desc: Joi.string().allow(null, ''),
  status: Joi.number(),
}

const editRoleSchema = {
  role_name: Joi.string().required().error(new Error('姓名不能为空')),
  role_desc: Joi.string().allow(null, ''),
  status: Joi.number(),
  id: Joi.number().required(),
}

const deleteRoleSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

const grantRoleSchema = {
  id: Joi.number().required(),
  auth_list: Joi.string().required(),
}

module.exports = {
  roleSchema,
  editRoleSchema,
  deleteRoleSchema,
  grantRoleSchema
}