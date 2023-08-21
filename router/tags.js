const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  tagSchema,
  editTagSchema,
  deleteTagSchema
} = require('../router_schema/tags')

const {
  getTagsList,
  addTags,
  editTags,
  deleteTags,
} = require('../router_handle/tags')
// 标签列表
router.get('/tags/list', getTagsList)

// 新增标签
router.post(
  '/tags/add',
  expressJoi({
    body: tagSchema,
  }),
  addTags
)

// 修改标签
router.post(
  '/tags/edit',
  expressJoi({
    body: editTagSchema,
  }),
  editTags
)

// 删除标签
router.post(
  '/tags/delete',
  expressJoi({
    body: deleteTagSchema,
  }),
  deleteTags
)

module.exports = router
