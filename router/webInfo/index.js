const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const { webSchema } = require('./schema')

const { getWebInfo, editWebInfo } = require('./handle')
// 获取网站信息
router.get('/web/info', getWebInfo)

// 修改网站信息
router.post(
  '/web/info/edit',
  expressJoi({
    body: webSchema,
  }),
  editWebInfo
)

module.exports = router
