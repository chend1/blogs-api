const db = require('../db/index')
const getLinkList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  if (page) {
    const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM friend_link WHERE title LIKE '%${
      keyword || ''
    }%' LIMIT ${(page - 1) * limit},${limit};`
    db.query(sql, (err, results) => {
      if (err) throw err
      const totalSql = `SELECT COUNT(*) AS total FROM friend_link WHERE title LIKE '%${keyword}%'`
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
  } else {
    const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM friend_link WHERE title LIKE '%${
      keyword || ''
    }%'`
    db.query(sql, (err, results) => {
      if (err) throw err
      res.send_res(
        {
          list: results,
        },
        '请求成功'
      )
    })
  }
}
// 新增
const addLink = (req, res) => {
  const body = req.body
  // 查询友情链接名是否重复
  const LinkSql = 'SELECT * FROM friend_link WHERE ?'
  db.query(LinkSql, { title: body.title }, (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      return res.send_res({}, '友情链接已存在', 400, 0)
    }
    // 添加新友情链接到数据库
    const sql = 'INSERT INTO friend_link SET ?'
    const { timestampChange } = require('../utils/index')
    db.query(
      sql,
      {
        title: body.title,
        link: body.link,
        sort: body.sort,
        status: body.status,
        create_time: timestampChange(new Date()),
      },
      (err, result) => {
        if (err) throw err
        res.send_res({}, '添加成功')
      }
    )
  })
}
// 编辑
const editLink = (req, res) => {
  const body = req.body
  const sql = 'UPDATE friend_link SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        title: body.title,
        link: body.link,
        sort: body.sort,
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
const deleteLink = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM friend_link WHERE id = ?'
  db.query(sql, body.id, (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}

module.exports = {
  getLinkList,
  addLink,
  editLink,
  deleteLink,
}
