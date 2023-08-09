const express = require('express')
const router = express.Router()

// 用户列表
router.get('/user/list', (req, res) => {
  res.send('/user/list ok')
})

// 新增用户
router.post('/add/user', (req, res) => {
  res.send('/add/user ok')
})

// 修改用户
router.post('/deit/user', (req, res) => {
  res.send('/deit/user ok')
})

// 删除用户
router.post('/delete/user', (req, res) => {
  res.send('/delete/user ok')
})

module.exports = router