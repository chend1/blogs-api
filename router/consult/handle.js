const db = require('../../db/index')
const getConsultList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time  FROM consult_list WHERE name LIKE '%${
    keyword || ''
  }%'LIMIT ${(page - 1) * limit},${limit};`
  db.query(sql, (err, results) => {
    if (err) throw err
    const totalSql = `SELECT COUNT(*) AS total FROM consult_list WHERE name LIKE '%${
      keyword || ''
    }%'`
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

const editConsult = (req, res) => {
  const body = req.body
  const sql = 'UPDATE consult_list SET ? WHERE id = ?'
  db.query(sql, [{ is_reply: body.is_reply }, body.id], (err, result) => {
    if (err) throw err
    res.send_res({}, '修改成功')
  })
}

const deleteConsult = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM consult_list WHERE id = ?'
  db.query(sql, body.id, (err, result) => {
    if (err) throw err
    const sql2 = 'DELETE FROM consult_info WHERE consult_id = ?'
    db.query(sql2, body.id, (err, result) => {
      if (err) throw err
      res.send_res({}, '删除成功')
    })
  })
}

const getConsultInfo = (req, res) => {
  const query = req.query
  // console.log(query);
  const sql = `SELECT * FROM consult_info WHERE consult_id = ?`
  db.query(sql, [query.id], (err, result) => {
    if (err) throw err
    // console.log(result, '请求成功')
    // const { modifyMenuList } = require('../../utils/index')
    res.send_res({ list: result }, '请求成功')
  })
}

const replyConsult = (req, res) => {
  const body = req.body
  const sql = 'INSERT INTO consult_info SET ?'
  const { timestampChange } = require('../../utils/index')
  db.query(
    sql,
    {
      consult_id: body.consult_id,
      parent_id: body.parent_id,
      consult_content: body.consult_content,
      name: body.name,
      avatar: body.avatar,
      reply_name: body.reply_name,
      reply_avatar: body.reply_avatar,
      reply_user_id: body.reply_user_id,
      create_time: timestampChange(new Date()),
    },
    (err, result) => {
      if (err) throw err
      res.send_res({}, '回复成功')
    }
  )
}

module.exports = {
  getConsultList,
  editConsult,
  deleteConsult,
  getConsultInfo,
  replyConsult,
}
