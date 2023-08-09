const express = require('express')
const router = express.Router()

// 角色列表
router.get('/menu/list', (req, res) => {
  res.send('/menu/list ok')
})

// 新增角色
router.post('/add/menu', (req, res) => {
  res.send('/add/menu ok')
})

// 修改角色
router.post('/deit/menu', (req, res) => {
  res.send('/deit/menu ok')
})

// 删除角色
router.post('/delete/menu', (req, res) => {
  res.send('/delete/menu ok')
})

module.exports = router