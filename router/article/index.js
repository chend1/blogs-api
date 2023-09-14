const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  articleSchema,
  addArticleSchema,
  editArticleSchema,
  deleteArticleSchema,
  articleInfoSchema,
  issueArticleSchema
} = require('./schema')

const {
  getArticleList,
  addArticle,
  editArticle,
  deleteArticle,
  issueArticle,
  getArticleInfo,
} = require('./handle')
// 文章列表
/**
 * 
 * @api {get} /api/user/info 用户信息
 * @apiName 用户信息
 * @apiGroup 用户
 * @apiDescription 返回用户详细信息
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} id='' 
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     id: 1
 * }
 * 
 * @apiSuccess {Number} code 200
 * @apiSuccess {Object} data 用户信息
 * @apiSuccessExample {type} Response-Example:
 * {
 *  code: 200,
 *  data: {
 *    name: '',
 *    age: '',
 *    sex: '',
 *    ...
 *  }
 * }
 * 
 */
router.get(
  '/article/list',
  expressJoi({
    query: articleSchema,
  }),
  getArticleList
)

// 文章详情
router.get(
  '/article/info',
  expressJoi({
    query: articleInfoSchema,
  }),
  getArticleInfo
)

// 新增文章
router.post(
  '/article/add',
  expressJoi({
    body: addArticleSchema,
  }),
  addArticle
)

// 修改文章
router.post(
  '/article/edit',
  expressJoi({
    body: editArticleSchema,
  }),
  editArticle
)

// 删除文章
router.post(
  '/article/delete',
  expressJoi({
    body: deleteArticleSchema,
  }),
  deleteArticle
)

// 修改文章状态
router.post(
  '/article/issue',
  expressJoi({
    body: issueArticleSchema,
  }),
  issueArticle
)

module.exports = router
