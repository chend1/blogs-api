const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  getConsultList,
  editConsult,
  deleteConsult,
  getConsultInfo,
  replyConsult,
} = require('./handle')
const {
  editSchema,
  deleteSchema,
  replySchema,
  infoSchema
} = require('./schema')

// 咨询列表
router.get('/consult/list', getConsultList)

// 修改咨询
router.post(
  '/consult/edit',
  expressJoi({
    body: editSchema,
  }),
  editConsult
)

// 删除咨询
router.post(
  '/consult/delete',
  expressJoi({
    body: deleteSchema,
  }),
  deleteConsult
)

// 回复列表
router.get(
  '/consult/reply/list',
  expressJoi({
    query: infoSchema,
  }),
  getConsultInfo
)

// 回复咨询
router.post(
  '/consult/reply/add',
  expressJoi({
    body: replySchema,
  }),
  replyConsult
)

module.exports = router
