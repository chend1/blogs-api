const db = require('../db/index')
const bcrypt = require('bcryptjs')
const { setToken } = require('../utils/token')

const getUserInfo = (req, res) => {
  if (!req.auth) {
    return res.send_res({}, '账号不存在', 400, 0)
  }
  const { id } = req.auth
  const sql = 'select * from user where ?'
  db.query(sql, { id }, (err, result) => {
    if (err) throw err
    const { role_id } = result[0]
    const roleSql = 'select * from role where ?'
    db.query(roleSql, { id: role_id }, (err, info) => {
      if (err) throw err
      if(info.length === 0) return res.send_res({}, '角色不存在', 400, 0)
      const menu = info[0].auth_list.split(',')
      const menuSql = 'select * from menu'
      db.query(menuSql, (err, menuInfo) => {
        const menuList = menu.map(item => {
          const option = menuInfo.find(item2 => item2.id == item)
          return option
        })
        const { modifyMenuList } = require('../utils/index')
        if (err) throw err
        res.send_res(
          {
            info: result[0],
            menu: modifyMenuList(menuList),
          },
          '请求成功'
        )
      })
    })
  })
}

const handlerLogin = (req, res) => {
  const body = req.body
  const sql = 'select * from user where ?'
  db.query(sql, { account: body.account }, (err, result) => {
    if (err) throw err
    if (result.length === 0) {
      res.send_res({}, '账号不存在', 400, 0)
      return
    }
    // 对比密码是否正确
    if (!bcrypt.compareSync(body.password, result[0].password)) {
      res.send_res({}, '密码错误', 400, 0)
      return
    }
    // 返回token
    res.send_res(
      {
        token: setToken({
          id: result[0].id,
          account: result[0].account,
        }),
      },
      '登录成功'
    )
  })
}

const handlerRegister = (req, res) => {
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
    const password = bcrypt.hashSync(body.password)
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
        res.send_res({}, '注册成功')
      }
    )
  })
}

module.exports = {
  getUserInfo,
  handlerLogin,
  handlerRegister,
}
