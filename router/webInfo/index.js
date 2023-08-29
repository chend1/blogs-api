const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
router.get('/web/info', getUserList)

// 新增网站信息
router.post(
  '/web/add',
  expressJoi({
    body: userSchema,
  }),
  addUser
)

// 修改网站信息
router.post(
  '/web/edit',
  expressJoi({
    body: userEditSchema,
  }),
  editUser
)

// 删除网站信息
router.post(
  '/web/delete',
  expressJoi({
    body: deleteUserSchema,
  }),
  deleteUser
)

module.exports = router