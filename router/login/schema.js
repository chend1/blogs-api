const Joi = require('joi')

const loginSchema = {
  account: Joi.string().required().error(new Error('账号不能为空')),
  password: Joi.string().required().error(new Error('密码不能为空')),
}

const registerSchema = {
  account: Joi.string()
    .min(6)
    .max(12)
    .required()
    .error(new Error('账号必须在6-12位')),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,16}$'))
    .error(new Error('密码必须在6-16位')),
  repeat_password: Joi.ref('password'),
  name: Joi.string().required().error(new Error('姓名不能为空'))
}

module.exports = {
  loginSchema,
  registerSchema
}