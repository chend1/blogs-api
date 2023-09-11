const Joi = require('joi')

const editSchema = {
  is_reply: Joi.number().required().error(new Error('状态不能为空')),
  id: Joi.number().required().error(new Error('id不能为空')),
}

const deleteSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}
const replySchema = {
  consult_id: Joi.number().required().error(new Error('consult_id不能为空')),
  parent_id: Joi.number().allow(null, ''),
  consult_content: Joi.string().required().error(new Error('回复内容不能为空')),
  name: Joi.string().allow(null, ''),
  avatar: Joi.string().allow(null, ''),
  reply_name: Joi.string().required().error(new Error('回复名称不能为空')),
  reply_avatar: Joi.string().allow(null, ''),
  reply_user_id: Joi.number().required().error(new Error('reply_user_id不能为空')),
}

const infoSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}
module.exports = {
  editSchema,
  deleteSchema,
  replySchema,
  infoSchema
}
