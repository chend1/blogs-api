const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  linkSchema,
  editLinkSchema,
  deleteLinkSchema
} = require('./schema')

const {
  getLinkList,
  addLink,
  editLink,
  deleteLink,
} = require('./handle')
// 标签列表
router.get('/link/list', getLinkList)

// 新增标签
router.post(
  '/link/add',
  expressJoi({
    body: linkSchema,
  }),
  addLink
)

// 修改标签
router.post(
  '/link/edit',
  expressJoi({
    body: editLinkSchema,
  }),
  editLink
)

// 删除标签
router.post(
  '/link/delete',
  expressJoi({
    body: deleteLinkSchema,
  }),
  deleteLink
)

module.exports = router
