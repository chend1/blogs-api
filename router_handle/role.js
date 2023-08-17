const db = require('../db/index')
const getRoleList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM role WHERE role_name LIKE '%${keyword}%' LIMIT ${
    (page - 1) * limit
  },${limit};`
  db.query(sql, (err, results) => {
    if (err) throw err
    const totalSql = `SELECT COUNT(*) AS total FROM role`
    db.query(totalSql, (err, info) => {
      if (err) throw err
      res.send_res(
        {
          list: results,
          total: info[0].total,
          page,
          size: limit,
        },
        '请求成功'
      )
    })
  })
}

// 新增
const addRole = (req, res) => {
  const body = req.body
  // 查询角色名是否重复
  const roleSql = 'SELECT * FROM role WHERE ?'
  db.query(roleSql, { role_name: body.role_name }, (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      return res.send_res({}, '角色已存在', 400, 0)
    }
    // 添加新角色到数据库
    const sql = 'INSERT INTO role SET ?'
    const { timestampChange } = require('../utils/index')
    db.query(
      sql,
      {
        role_name: body.role_name,
        role_desc: body.role_desc,
        create_time: timestampChange(new Date()),
        status: body.status,
      },
      (err, result) => {
        if (err) throw err
        res.send_res({}, '添加成功')
      }
    )
  })
}
// 编辑
const editRole = (req, res) => {
  const body = req.body
  const sql = 'UPDATE role SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        role_name: body.role_name,
        role_desc: body.role_desc,
        status: body.status,
      },
      body.id,
    ],
    (err, result) => {
      if (err) throw err
      res.send_res({}, '修改成功')
    }
  )
}

// 删除
const deleteRole = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM role WHERE id = ?'
  db.query(sql, body.id, (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}
// 授权
const authRole = (req, res) => {
  const body = req.body
  const sql = 'UPDATE role SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        auth_list: body.auth_list,
      },
      body.id,
    ],
    (err, result) => {
      if (err) throw err
      res.send_res({}, '授权成功')
    }
  )
}

module.exports = {
  getRoleList,
  addRole,
  editRole,
  deleteRole,
  authRole,
}
