const express = require('express')
const router = express.Router()
const db = require('../../db/index')

// formData处理中间件
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads') // 将文件保存在 uploads 目录中
  },
  filename: function (req, file, cb) {
    // console.log(req.body.name);
    const fileName = req.body.name || file.originalname
    const fileExtension = fileName.split('.').pop()
    const name = fileName.replace(`.${fileExtension}`, '')
    const suffix = file.mimetype.split('/')[1]
    const { timestampChange } = require('../../utils/index')
    cb(null, name + '_' + timestampChange(new Date(), 'YYYYMMDDHHmmss') + '.' + suffix) // 使用时间戳和原始文件名作为文件名
  },
})
const upload = multer({ storage: storage })
// 文件上传
router.post('/upload', upload.single('file'), (req, res) => {
  // console.log(req.file, req.body.name);
  const sql = 'INSERT INTO file_list SET ?'
  const { timestampChange } = require('../../utils/index')
  db.query(
    sql,
    {
      url: 'http://localhost:3000/' + req.file.destination + '/' + req.file.filename,
      name: req.file.filename,
      path: req.file.path,
      type: req.file.mimetype.split('/')[1],
      create_time: timestampChange(new Date()),
    },
    (err, result) => {
      if (err) throw err
      res.send_res({
        url: 'http://localhost:3000/' + req.file.destination + '/' + req.file.filename,
        path: req.file.path,
      }, '上传成功')
    }
  )
  
})

module.exports = router
