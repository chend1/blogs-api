const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  articleClassSchema,
  editAarticleClassSchema,
  deleteAarticleClassSchema
} = require('../router_schema/article_class')

const {
  getArticleClassList,
  addArticleClass,
  editArticleClass,
  deleteArticleClass,
} = require('../router_handle/article_class')
// 分类列表
router.get('/class/list', getArticleClassList)

// 新增分类
router.post(
  '/class/add',
  expressJoi({
    body: articleClassSchema,
  }),
  addArticleClass
)

// 修改分类
router.post(
  '/class/edit',
  expressJoi({
    body: editAarticleClassSchema,
  }),
  editArticleClass
)

// 删除分类
router.post(
  '/class/delete',
  expressJoi({
    body: deleteAarticleClassSchema,
  }),
  deleteArticleClass
)

module.exports = router
