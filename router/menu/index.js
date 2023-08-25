const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  menuSchema,
  editMenuSchema,
  deleteMenuSchema,
} = require('./schema')

const {
  getMenuList,
  addMenu,
  editMenu,
  deleteMenu,
} = require('./handle')
// 菜单列表
router.get('/menu/list', getMenuList)

// 新增菜单
router.post(
  '/menu/add',
  expressJoi({
    body: menuSchema,
  }),
  addMenu
)

// 修改菜单
router.post(
  '/menu/edit',
  expressJoi({
    body: editMenuSchema,
  }),
  editMenu
)

// 删除菜单
router.post(
  '/menu/delete',
  expressJoi({
    body: deleteMenuSchema,
  }),
  deleteMenu
)

module.exports = router
