const Joi = require('joi')

const userSchema = {
  account: Joi.string()
    .min(6)
    .max(12)
    .required()
    .error(new Error('账号必须在6-12位')),
  name: Joi.string().required().error(new Error('姓名不能为空')),
}

const deleteUserSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

module.exports = {
  userSchema,
  deleteUserSchema
}