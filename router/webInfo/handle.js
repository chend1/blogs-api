const db = require('../../db/index')

const getWebInfo = (req, res) => {
  const sql = 'SELECT * FROM web_info'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send_res(result[0] || {}, '获取成功')
  })
}
const editWebInfo = (req, res) => {
  const body = req.body
  const sql = 'UPDATE web_info SET ?'
  db.query(
    sql,
    {
      web_name: body.web_name,
      domain_name: body.domain_name,
      provider: body.provider,
      title: body.title,
      keywords: body.keywords,
      description: body.description,
      user_name: body.user_name,
      phone: body.phone,
      qq: body.qq,
      wx_no: body.wx_no,
      email: body.email,
      address: body.address,
    },
    (err, result) => {
      if (err) throw err
      res.send_res({}, '修改成功')
    }
  )
}

module.exports = {
  getWebInfo,
  editWebInfo,
}
