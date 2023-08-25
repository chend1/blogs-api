const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  getUserInfo,
  handlerLogin,
  handlerRegister,
} = require('./handle')
const { loginSchema, registerSchema } = require('./schema')

// 获取登录详情
router.get('/login/info', getUserInfo)

// 用户登录
router.post(
  '/login',
  expressJoi({
    body: loginSchema,
  }),
  handlerLogin
)

// 用户注册
router.post(
  '/register',
  expressJoi({
    body: registerSchema,
  }),
  handlerRegister
)

module.exports = router
