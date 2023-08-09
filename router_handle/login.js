const db = require('../db/index')
const bcrypt = require('bcryptjs')
const { setToken } = require('../utils/token')
const getUserInfo = (req, res) => {
  const { id } = req.auth || { id: 0 }
  const sql = 'select * from user where ?'
  db.query(sql, { id }, (err, result) => {
    if (err) {
      res.send({
        code: 1,
        msg: '查询失败',
      })
      return
    }
    res.send({
      code: 200,
      data: result[0],
      status: 1,
    })
  })
}

const handlerLogin = (req, res) => {
  const body = req.body
  const sql = 'select * from user where ?'
  db.query(sql, { account: body.account }, (err, result) => {
    if (err) throw err
    if (result.length === 0) {
      res.send({
        code: 1,
        msg: '账号不存在',
      })
      return
    }
    // 对比密码是否正确
    if (!bcrypt.compareSync(body.password, result[0].password)) {
      res.send({
        code: 1,
        msg: '密码错误',
      })
      return
    }
    // 返回token
    res.send({
      code: 200,
      data: {
        token: setToken({
          id: result[0].id,
          account: result[0].account,
        }),
      },
      status: 1,
    })
  })
  console.log(body)
}

const handlerRegister = (req, res) => {
  const body = req.body
  // 查询账号是否重复
  const accountSql = 'select * from user where ?'
  db.query(accountSql, { account: body.account }, (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({
        code: 1,
        msg: '账号已存在',
      })
      return
    }
    // 添加新用户到数据库
    const sql = 'insert into user set ?'
    const password = bcrypt.hashSync(body.password)
    db.query(
      sql,
      {
        account: body.account,
        password,
        name: body.name,
        email: body.email,
        phone: body.phone,
        avatar: body.avatar,
      },
      (err, result) => {
        if (err) throw err
        res.send({
          code: 200,
          data: '注册成功',
          status: 1,
        })
      }
    )
  })
}

module.exports = {
  getUserInfo,
  handlerLogin,
  handlerRegister,
}
