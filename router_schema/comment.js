const Joi = require('joi')

const commentSchema = Joi.object({
  id: Joi.number(),
  user_id: Joi.number(),
}).xor('id', 'user_id')

const addCommentSchema = {
  content: Joi.string().required().error(new Error('内容不能为空')),
  user_id: Joi.number().required().error(new Error('用户id不能为空')),
  user_name: Joi.string().required().error(new Error('用户名不能为空')),
  user_avatar: Joi.string().allow(null, ''),
  reply_user_id: Joi.number().allow(null, ''),
  reply_user_name: Joi.string().allow(null, ''),
  reply_user_avatar: Joi.string().allow(null, ''),
  article_id: Joi.number().required().error(new Error('文章id不能为空')),
  parent_id: Joi.number().allow(null, ''),
}

const editCommentSchema = {
  content: Joi.string().required().error(new Error('内容不能为空')),
  user_id: Joi.number().required().error(new Error('用户id不能为空')),
  user_name: Joi.string().required().error(new Error('用户名不能为空')),
  user_avatar: Joi.string().required().error(new Error('用户头像不能为空')),
  article_id: Joi.number().required().error(new Error('文章id不能为空')),
  id: Joi.number().required().error(new Error('id不能为空')),
}

const deleteCommentSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

module.exports = {
  commentSchema,
  addCommentSchema,
  editCommentSchema,
  deleteCommentSchema,
}
