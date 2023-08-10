const db = require('../db/index')
const bcrypt = require('bcryptjs')
const getUserList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  const sql = `SELECT * FROM user WHERE NAME LIKE '%${keyword}%' LIMIT ${
    (page - 1) * limit
  },${limit};`
  db.query(sql, (err, results) => {
    console.log(results)
    if (err) throw err
    // const total = results[1][0].total;
    res.send_res(
      {
        list: results,
        total: 10,
        page,
        size: limit,
      },
      '请求成功'
    )
  })
}

const addUser = (req, res) => {
  const body = req.body
  // 查询账号是否重复
  const accountSql = 'select * from user where ?'
  db.query(accountSql, { account: body.account }, (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      return res.send_res({}, '账号已存在', 400, 0)
    }
    // 添加新用户到数据库
    const sql = 'insert into user set ?'
    const password = bcrypt.hashSync(body.password || '123456')
    const { timestampChange } = require('../utils/index')
    db.query(
      sql,
      {
        account: body.account,
        password,
        name: body.name,
        email: body.email,
        phone: body.phone,
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
  const sql = 'update user set ? where id = ?'
  db.query(sql, [body, body.id], (err, result) => {
    if (err) throw err
    res.send_res({}, '修改成功')
  })
}

const deleteUser = (req, res) => {
  const body = req.body
  const sql = 'delete from user where id = ?'
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
