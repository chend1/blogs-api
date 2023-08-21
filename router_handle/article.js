const db = require('../db/index')
const getArticleList = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.size) || 10
  const keyword = req.query.keyword
  // 构建查询语句
  const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM article WHERE title LIKE '%${keyword}%' LIMIT ${
    (page - 1) * limit
  },${limit};`
  db.query(sql, (err, results) => {
    if (err) throw err
    const totalSql = `SELECT COUNT(*) AS total FROM article`
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

const addArticle = (req, res) => {
  const body = req.body
  // 添加文章
  const sql = 'INSERT INTO article SET ?'
  const { timestampChange } = require('../utils/index')
  db.query(
    sql,
    {
      title: body.title,
      abstract: body.abstract,
      class_id: body.class_id,
      tags: body.tags,
      author: body.author,
      keyword: body.keyword,
      thumbnail: body.thumbnail,
      type: body.type,
      create_time: timestampChange(new Date()),
    },
    (err, result) => {
      if (err) throw err
      const infoSql = `INSERT INTO article_info SET ?`
      db.query(
        infoSql,
        {
          article_id: result.insertId,
          content: body.content,
          create_time: timestampChange(new Date()),
        },
        (err, result) => {
          if (err) throw err
          if(body.tags){
            const values = body.tags.split(',').map(item => {
              return [item, timestampChange(new Date())]
            })
            const infoSql = `INSERT INTO tags(name, create_time) VALUES ?`
            db.query(
              infoSql,
              [values],
              (err, result) => {
                if (err) throw err
              }
            )
          }
          res.send_res({}, '添加成功')
        }
      )
    }
  )
}

const editArticle = (req, res) => {
  const body = req.body
  console.log(body)
  const sql = 'UPDATE article SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        title: body.title,
        abstract: body.abstract,
        class_id: body.class_id,
        tags: body.tags,
        author: body.author,
        keyword: body.keyword,
        thumbnail: body.thumbnail,
        type: body.type,
      },
      body.id,
    ],
    (err, result) => {
      if (err) throw err
      if (body.content) {
        const infoSql = `UPDATE article_info SET ? WHERE article_id = ?`
        db.query(
          infoSql,
          [
            {
              content: body.content,
            },
            body.id,
          ],
          (err, result) => {
            if (err) throw err
            res.send_res({}, '修改成功')
          }
        )
      } else {
        res.send_res({}, '修改成功')
      }
    }
  )
}

const deleteArticle = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM article WHERE id = ?'
  db.query(sql, body.id, (err, result) => {
    if (err) throw err
    const infoSql = `DELETE FROM article_info WHERE article_id = ?`
    db.query(infoSql, body.id, (err, result) => {
      if (err) throw err
      res.send_res({}, '删除成功')
    })
  })
}

const getArticleInfo = (req, res) => {
  const id = req.query.id
  const sql = `SELECT *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time FROM article_info WHERE article_id = ${id};`
  db.query(sql, (err, info) => {
    if (err) throw err
    const listSql = `SELECT * FROM article WHERE id = ${id};`
    db.query(listSql, (err, result) => {
      if (err) throw err
      res.send_res({
        ...result[0],
        ...info[0]
      }, '请求成功')
    })
  })
}

const issueArticle = (req, res) => {
  const id = req.body.id
  const type = req.body.type
  const sql = `UPDATE article SET type = ${type} WHERE id = ${id};`
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send_res({}, '修改成功')
  })
}

module.exports = {
  getArticleList,
  addArticle,
  editArticle,
  deleteArticle,
  getArticleInfo,
  issueArticle
}
