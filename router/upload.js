const express = require('express')
const router = express.Router()

// formData处理中间件
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads') // 将文件保存在 uploads 目录中
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname
    const fileExtension = fileName.split('.').pop()
    const name = fileName.replace(`.${fileExtension}`, '')
    cb(null, name + Date.now() + '-.' + fileExtension) // 使用时间戳和原始文件名作为文件名
  },
})
const upload = multer({ storage: storage })
// 文件上传
router.post('/upload', upload.single('file'), (req, res) => {
  res.send_res({
    url: 'http://localhost:3000/' + req.file.path,
    path: req.file.path,
  }, '上传成功')
})

module.exports = router
