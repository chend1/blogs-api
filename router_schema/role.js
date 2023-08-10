const Joi = require('joi')

const roleSchema = {
  role_name: Joi.string().required().error(new Error('姓名不能为空')),
}

module.exports = {
  roleSchema
}