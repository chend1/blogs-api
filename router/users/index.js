const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  getUserList,
  addUser,
  editUser,
  deleteUser,
  resetUserPassword,
  editUserInfo,
  updatePassword
} = require('./handle')
const {
  userSchema,
  userEditSchema,
  deleteUserSchema,
  infoSchema,
  passwordSchema
} = require('./schema')
// 用户列表
router.get('/user/list', getUserList)

// 新增用户
router.post(
  '/user/add',
  expressJoi({
    body: userSchema,
  }),
  addUser
)

// 修改用户
router.post(
  '/user/edit',
  expressJoi({
    body: userEditSchema,
  }),
  editUser
)
//重置密码
router.post(
  '/user/password/reset',
  expressJoi({
    body: deleteUserSchema
  }),
  resetUserPassword
)

// 删除用户
router.post(
  '/user/delete',
  expressJoi({
    body: deleteUserSchema,
  }),
  deleteUser
)
// 修改用户基本信息
router.post(
  '/user/edit/info',
  expressJoi({
    body: infoSchema,
  }),
  editUserInfo
)

// 修改用户密码
router.post(
  '/user/edit/password',
  expressJoi({
    body: passwordSchema,
  }),
  updatePassword
)

module.exports = router
