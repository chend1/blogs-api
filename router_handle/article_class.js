const db = require('../db/index')
const getArticleClassList = (req, res) => {
  // 构建查询语句
  const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM classification ORDER BY sort`
  db.query(sql, (err, results) => {
    if (err) throw err
    const { modifyMenuList } = require('../utils/index')
    res.send_res(
      {
        list: modifyMenuList(results),
      },
      '请求成功'
    )
  })
}

const addArticleClass = (req, res) => {
  const body = req.body
  // 添加分类
  const sql = 'INSERT INTO classification SET ?'
  const { timestampChange } = require('../utils/index')
  db.query(
    sql,
    {
      name: body.name,
      status: body.status,
      description: body.description,
      parent_id: body.parent_id,
      sort: body.sort,
      create_time: timestampChange(new Date()),
    },
    (err, result) => {
      if (err) throw err
      res.send_res({}, '添加成功')
    }
  )
}

const editArticleClass = (req, res) => {
  const body = req.body
  const sql = 'UPDATE classification SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        name: body.name,
        status: body.status,
        description: body.description,
        parent_id: body.parent_id,
        sort: body.sort,
      },
      body.id,
    ],
    (err, result) => {
      if (err) throw err
      res.send_res({}, '修改成功')
    }
  )
}

const deleteArticleClass = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM classification WHERE id = ? OR parent_id = ?'
  db.query(sql, [body.id, body.id], (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}

module.exports = {
  getArticleClassList,
  addArticleClass,
  editArticleClass,
  deleteArticleClass,
}
