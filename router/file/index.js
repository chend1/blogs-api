const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  getFileList,
  deleteFile,
} = require('./handle')

const {
  deleteFileSchema
} = require('./schema')
// 文件列表
router.get('/file/list', getFileList)


// 删除文件
router.post(
  '/file/delete',
  expressJoi({
    body: deleteFileSchema,
  }),
  deleteFile
)

module.exports = router
