const db = require('../../db/index')
const getCommentList = (req, res) => {
  // 构建查询语句
  const condition = req.query.id ? `article_id = ${req.query.id}` : `user_id = ${req.query.user_id}`
  const sql = `SELECT *,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time FROM comment WHERE ${condition};`
  db.query(sql, (err, results) => {
    if (err) throw err
    const { modifyMenuList } = require('../../utils/index')
    res.send_res(
      {
        list: modifyMenuList(results),
      },
      '请求成功'
    )
  })
}

const addComment = (req, res) => {
  const body = req.body
  const sql = 'INSERT INTO comment SET ?'
  const { timestampChange } = require('../../utils/index')
  db.query(
    sql,
    {
      content: body.content,
      user_id: body.user_id,
      user_name: body.user_name,
      user_avatar: body.user_avatar,
      reply_user_id: body.user_id,
      reply_user_name: body.user_name,
      reply_user_avatar: body.user_avatar,
      article_id: body.article_id,
      parent_id: body.parent_id,
      create_time: timestampChange(new Date()),
    },
    (err, result) => {
      if (err) throw err
      res.send_res({}, '添加成功')
    }
  )
}

const editComment = (req, res) => {
  const body = req.body
  const sql = 'UPDATE comment SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        content: body.content,
        user_id: body.user_id,
        user_name: body.user_name,
        user_avatar: body.user_avatar,
        article_id: body.article_id,
      },
      body.id,
    ],
    (err, result) => {
      if (err) throw err
      res.send_res({}, '修改成功')
    }
  )
}

const deleteComment = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM comment WHERE id = ? OR parent_id = ?'
  db.query(sql, [body.id, body.id], (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}

module.exports = {
  getCommentList,
  addComment,
  editComment,
  deleteComment,
}
