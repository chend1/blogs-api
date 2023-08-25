const db = require('../../db/index')
const getFileList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  if (page) {
    const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM file_list WHERE name LIKE '%${
      keyword || ''
    }%' LIMIT ${(page - 1) * limit},${limit};`
    db.query(sql, (err, results) => {
      if (err) throw err
      const totalSql = `SELECT COUNT(*) AS total FROM file_list WHERE name LIKE '%${keyword}%'`
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
    const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM file_list WHERE name LIKE '%${
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

// 删除
const deleteFile = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM file_list WHERE id = ?'
  db.query(sql, body.id, (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}

module.exports = {
  getFileList,
  deleteFile,
}
