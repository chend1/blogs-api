const db = require('../../db/index')
const bcrypt = require('bcryptjs')
const getVisitorsList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time  FROM visitors WHERE name LIKE '%${
    keyword || ''
  }%' OR account LIKE '%${keyword || ''}%' OR phone LIKE '%${
    keyword || ''
  }%' LIMIT ${(page - 1) * limit},${limit};`
  db.query(sql, (err, results) => {
    if (err) throw err
    const totalSql = `SELECT COUNT(*) AS total FROM visitors WHERE name LIKE '%${
      keyword || ''
    }%' OR account LIKE '%${keyword || ''}%' OR phone LIKE '%${keyword || ''}%'`
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

const editVisitors = (req, res) => {
  const body = req.body
  const sql = 'UPDATE visitors SET ? WHERE id = ?'
  db.query(sql, [{ status: body.status }, body.id], (err, result) => {
    if (err) throw err
    res.send_res({}, '修改成功')
  })
}

const deleteVisitors = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM visitors WHERE id = ?'
  db.query(sql, body.id, (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}

const resetVisitorsPassword = (req, res) => {
  const body = req.body
  const password = bcrypt.hashSync('123456')
  const sql = 'UPDATE visitors SET password = ? WHERE id = ?'
  db.query(sql, [password, body.id], (err, result) => {
    if (err) throw err
    res.send_res({}, '重置成功')
  })
}

const getVisitorsInfo = (req, res) => {
  const id = req.query.id
  const sql = `SELECT visitors.*,DATE_FORMAT(visitors.create_time, '%Y-%m-%d %H:%i:%s') AS create_time,visitors_info.* FROM visitors LEFT JOIN visitors_info ON visitors.id = visitors_info.user_id WHERE visitors.id = ${id};`
  db.query(sql, (err, info) => {
    if (err) throw err
    res.send_res(
      {
        ...info[0],
      },
      '请求成功'
    )
  })
}

module.exports = {
  getVisitorsList,
  editVisitors,
  deleteVisitors,
  resetVisitorsPassword,
  getVisitorsInfo
}
