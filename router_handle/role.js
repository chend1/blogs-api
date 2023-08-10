const db = require('../db/index')
const getRoleList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  const sql = `SELECT * FROM role`
  db.query(sql, (err, results) => {
    // console.log(results)
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

module.exports = {
  getRoleList
}