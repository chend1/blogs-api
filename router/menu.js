const express = require('express')
const router = express.Router()

// 菜单列表
router.get('/menu/list', (req, res) => {
  res.send('/menu/list ok')
})

// 新增菜单
router.post('/add/menu', (req, res) => {
  res.send('/add/menu ok')
})

// 修改菜单
router.post('/deit/menu', (req, res) => {
  res.send('/deit/menu ok')
})

// 删除菜单
router.post('/delete/menu', (req, res) => {
  res.send('/delete/menu ok')
})

module.exports = router