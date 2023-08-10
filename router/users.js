const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  getUserList,
  addUser,
  editUser,
  deleteUser,
} = require('../router_handle/user')
const { userSchema, deleteUserSchema } = require('../router_schema/user')
// 用户列表
router.get('/user/list', getUserList)

// 新增用户
router.post(
  '/add/user',
  expressJoi({
    body: userSchema,
  }),
  addUser
)

// 修改用户
router.post(
  '/edit/user',
  expressJoi({
    body: userSchema,
  }),
  editUser
)

// 删除用户
router.post(
  '/delete/user',
  expressJoi({
    body: deleteUserSchema,
  }),
  deleteUser
)

module.exports = router
