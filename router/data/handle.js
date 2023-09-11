const db = require('../../db/index')

const getArticleData = (req, res) => {
  const sql = 'SELECT SUM(view) AS views,SUM(comment) AS comments,SUM(star) AS stars,COUNT(*) AS total FROM article WHERE type = 1'
  db.query(sql, (err, result) => {
    if (err) throw err
    // console.log(result);
    res.send_res(result[0], '获取成功')
  })
}

const getCommentData = (req, res) => {
  const sql = 'SELECT COUNT(*) AS total FROM comment'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send_res({
      total: result[0].total,
    }, '获取成功')
  })
}

const getRegisterPersonData = (req, res) => {
  const sql = 'SELECT sex,COUNT(*) AS total FROM visitors GROUP BY sex'
  db.query(sql, (err, result) => {
    if (err) throw err
    // console.log(result);
    res.send_res(result, '获取成功')
  })
}
const getMonthArticleData = (req, res) => {
  const sql = `SELECT MONTH(create_time) AS month, COUNT(*) AS count
  FROM article
  WHERE YEAR(create_time) = YEAR(CURDATE())
  GROUP BY month;`
  db.query(sql, (err, result) => {
    if (err) throw err
    // console.log(result);
    res.send_res(result, '获取成功')
  })
}
const getMonthCommentData = (req, res) => {
  const sql = `SELECT MONTH(create_time) AS month, COUNT(*) AS count
  FROM comment
  WHERE YEAR(create_time) = YEAR(CURDATE())
  GROUP BY month;`
  db.query(sql, (err, result) => {
    if (err) throw err
    // console.log(result);
    res.send_res(result, '获取成功')
  })
}
const getMonthViewData = (req, res) => {
  const sql = `SELECT MONTH(create_time) AS month, COUNT(*) AS count
  FROM view_list
  WHERE YEAR(create_time) = YEAR(CURDATE())
  GROUP BY month;`
  db.query(sql, (err, result) => {
    if (err) throw err
    // console.log(result);
    res.send_res(result, '获取成功')
  })
}

const getMonthStarData = (req, res) => {
  const sql = `SELECT MONTH(create_time) AS month, COUNT(*) AS count
  FROM star_list
  WHERE YEAR(create_time) = YEAR(CURDATE())
  GROUP BY month;`
  db.query(sql, (err, result) => {
    if (err) throw err
    // console.log(result);
    res.send_res(result, '获取成功')
  })
}
module.exports = {
  getArticleData,
  getCommentData,
  getRegisterPersonData,
  getMonthArticleData,
  getMonthCommentData,
  getMonthViewData,
  getMonthStarData
}