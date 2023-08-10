const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const { getRoleList } = require('../router_handle/role')
const { roleSchema } = require('../router_schema/role')
// 角色列表
router.get('/role/list', getRoleList)

// 新增角色
router.post('/add/role', (req, res) => {
  res.send('/add/menu ok')
})

// 修改角色
router.post('/edit/role', (req, res) => {
  res.send('/deit/role ok')
})

// 删除角色
router.post('/delete/role', (req, res) => {
  res.send('/delete/menu ok')
})

module.exports = router