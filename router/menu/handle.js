const db = require('../../db/index')
const getMenuList = (req, res) => {
  // 构建查询语句
  const sql = `SELECT * FROM menu`
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

const addMenu = (req, res) => {
  const body = req.body
  // 添加新用户到数据库
  const sql = 'INSERT INTO menu SET ?'
  const { timestampChange } = require('../../utils/index')
  db.query(
    sql,
    {
      menu_name: body.menu_name,
      path: body.path,
      status: body.status,
      icon: body.icon,
      sort: body.sort,
      parent_id: body.parent_id,
      create_time: timestampChange(new Date()),
    },
    (err, result) => {
      if (err) throw err
      res.send_res({}, '添加成功')
    }
  )
}

const editMenu = (req, res) => {
  const body = req.body
  console.log(body)
  const sql = 'UPDATE menu SET ? WHERE id = ?'
  db.query(
    sql,
    [
      {
        menu_name: body.menu_name,
        path: body.path,
        status: body.status,
        icon: body.icon,
        sort: body.sort,
        parent_id: body.parent_id,
      },
      body.id,
    ],
    (err, result) => {
      if (err) throw err
      res.send_res({}, '修改成功')
    }
  )
}

const deleteMenu = (req, res) => {
  const body = req.body
  const sql = 'DELETE FROM menu WHERE id = ? OR parent_id = ?'
  db.query(sql, [body.id, body.id], (err, result) => {
    if (err) throw err
    res.send_res({}, '删除成功')
  })
}

module.exports = {
  getMenuList,
  addMenu,
  editMenu,
  deleteMenu,
}
