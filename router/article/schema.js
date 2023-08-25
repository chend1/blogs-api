const Joi = require('joi')

const articleSchema = {
  page: Joi.number().allow(null, ''),
  size: Joi.number().allow(null, ''),
  class_id: Joi.number().allow(null, ''),
  type: Joi.number().allow(null, ''),
  keyword: Joi.string().allow(null, ''),
  start_time: Joi.string().allow(null, ''),
  end_time: Joi.string().allow(null, ''),
}

const addArticleSchema = {
  title: Joi.string().required().error(new Error('标题不能为空')),
  abstract: Joi.string().allow(null, ''),
  class_id: Joi.number().required().error(new Error('文章分类不能为空')),
  content: Joi.string().required().error(new Error('内容不能为空')),
  tags: Joi.string().allow(null, ''),
  thumbnail: Joi.string().required().error(new Error('缩略图不能为空')),
  type: Joi.number().required().error(new Error('文章类型不能为空')),
  author: Joi.string().required().error(new Error('作者不能为空')),
  keyword: Joi.string().allow(null, ''),
  user_id: Joi.number().required().error(new Error('用户id不能为空')),
}


const editArticleSchema = {
  title: Joi.string().required().error(new Error('标题不能为空')),
  abstract: Joi.string().allow(null, ''),
  class_id: Joi.number().required().error(new Error('文章分类不能为空')),
  content: Joi.string().required().error(new Error('内容不能为空')),
  tags: Joi.string().allow(null, ''),
  thumbnail: Joi.string().required().error(new Error('缩略图不能为空')),
  type: Joi.number().required().error(new Error('文章类型不能为空')),
  author: Joi.string().required().error(new Error('作者不能为空')),
  keyword: Joi.string().allow(null, ''),
  id: Joi.number().required().error(new Error('id不能为空')),
  user_id: Joi.number().required().error(new Error('用户id不能为空')),
  article_id: Joi.number().required().error(new Error('文章id不能为空')),
}

const deleteArticleSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

const articleInfoSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}
const issueArticleSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
  type: Joi.number().required().error(new Error('type不能为空')),
}

module.exports = {
  articleSchema,
  addArticleSchema,
  editArticleSchema,
  deleteArticleSchema,
  articleInfoSchema,
  issueArticleSchema
}