const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  getVisitorsList,
  editVisitors,
  deleteVisitors,
  resetVisitorsPassword,
  getVisitorsInfo,
} = require('./handle')
const {
  visitorsEditSchema,
  deleteVisitorsSchema,
  resetPasswordSchema,
  infoSchema
} = require('./schema')

// 游客列表
router.get('/visitors/list', getVisitorsList)

// 修改游客
router.post(
  '/visitors/edit',
  expressJoi({
    body: visitorsEditSchema,
  }),
  editVisitors
)
//重置密码
router.post(
  '/visitors/password/reset',
  expressJoi({
    body: resetPasswordSchema,
  }),
  resetVisitorsPassword
)

// 删除游客
router.post(
  '/visitors/delete',
  expressJoi({
    body: deleteVisitorsSchema,
  }),
  deleteVisitors
)

// 获取游客信息
router.get(
  '/visitors/info',
  expressJoi({
    query: infoSchema,
  }),
  getVisitorsInfo
)

module.exports = router
