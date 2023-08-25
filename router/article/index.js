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
