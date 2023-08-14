const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  getRoleList,
  addRole,
  editRole,
  deleteRole,
  authRole,
} = require('../router_handle/role')
const {
  roleSchema,
  editRoleSchema,
  deleteRoleSchema,
  grantRoleSchema,
} = require('../router_schema/role')
// 角色列表
router.get('/role/list', getRoleList)

// 新增角色
router.post(
  '/role/add',
  expressJoi({
    body: roleSchema,
  }),
  addRole
)

// 修改角色
router.post(
  '/role/edit',
  expressJoi({
    body: editRoleSchema,
  }),
  editRole
)

// 删除角色
router.post(
  '/role/delete',
  expressJoi({
    body: deleteRoleSchema,
  }),
  deleteRole
)

// 授权角色
router.post(
  '/role/auth',
  expressJoi({
    body: grantRoleSchema,
  }),
  authRole
)

module.exports = router
