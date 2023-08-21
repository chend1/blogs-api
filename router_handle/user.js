const db = require('../db/index')
const bcrypt = require('bcryptjs')
const getUserList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time  FROM user WHERE name LIKE '%${keyword || ''}%' LIMIT ${
    (page - 1) * limit
  },${limit};`
  db.query(sql, (err, results) => {
    if (err) throw err
    const totalSql = `SELECT COUNT(*) AS total FROM user`
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

const addUser = (req, res) => {
  const body = req.body
  // 查询账号是否重复
  const accountSql = 'SELECT * FROM user WHERE ?'
  db.query(accountSql, { account: body.account }, (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      return res.send_res({}, '账号已存在', 400, 0)
    }
    // 添加新用户到数据库
    const sql = 'INSERT INTO user SET ?'
    const password = bcrypt.hashSync(body.password || '123456')
    const { timestampChange } = require('../utils/index')
    console.log(body)
    db.query(
      sql,
      {
        account: body.account,
        password,
        name: body.name,
        email: body.email,
        phone: body.phone,
        role_id: body.role_id,
        avatar: body.avatar,
        create_time: timestampChange(new Date()),
      },
      (err, result) => {
        if (err) throw err
        res.send_res({}, '添加成功')
      }
    )
  })
}

const editUser = (req, res) => {
  const body = req.body
  console.log(body)
  const sql = 'UPDATE user SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        avatar: body.avatar,
        status: body.status,
        role_id: body.role_id,
      },
      body.id,
    ],
    (err, result) => {
      if (err) throw err
      res.send_res({}, '修改成功')
    }
  )
}

const deleteUser = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM user WHERE id = ?'
  db.query(sql, body.id, (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}

module.exports = {
  getUserList,
  addUser,
  editUser,
  deleteUser,
}
