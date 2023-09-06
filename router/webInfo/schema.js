const Joi = require('joi')

const webSchema = {
  web_name: Joi.string().allow(null, ''),
  domain_name: Joi.string().allow(null, ''),
  provider: Joi.string().allow(null, ''),
  title: Joi.string().allow(null, ''),
  keywords: Joi.string().allow(null, ''),
  description: Joi.string().allow(null, ''),
  userName: Joi.string().allow(null, ''),
  phone: Joi.string().allow(null, ''),
  qq: Joi.string().allow(null, ''),
  wx_no: Joi.string().allow(null, ''),
  email: Joi.string().email().allow(null, '').error(new Error('请输入正确的邮箱')),
  address: Joi.string().allow(null, ''),
}

module.exports = {
  webSchema
}