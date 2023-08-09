const mysql = require('mysql')
const dbConfig = require('./db.config')

module.exports = {
  query: (sql, params = [], callback) => {
    const connection = mysql.createConnection(dbConfig)
    connection.connect((err) => {
      if (err) throw err
      connection.query(sql, params, (err, results, fields) => {
        if (err) throw err
        callback && callback(err, results)
        connection.end((err) => {
          if (err) throw err
        })
      })
    })
  },
}
