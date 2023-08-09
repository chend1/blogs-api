const express = require('express')
const router = express.Router()

// 获取用户详情
router.get('/user/info', (req, res) => {
  res.send('/user/info ok')
})

// 用户登录
router.post('/login', (req, res) => {
  res.send('/login ok')
})

// 用户注册
router.post('/register', (req, res) => {
  res.send('/register ok')
})

module.exports = router