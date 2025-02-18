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
    cb(
      null,
      name + '_' + timestampChange(new Date(), 'YYYYMMDDHHmmss') + '.' + suffix
    ) // 使用时间戳和原始文件名作为文件名
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
      url:
        'http://localhost:3000/' +
        req.file.destination +
        '/' +
        req.file.filename,
      name: req.file.filename,
      path: req.file.path,
      type: req.file.mimetype.split('/')[1],
      create_time: timestampChange(new Date()),
    },
    (err, result) => {
      if (err) throw err
      res.send_res(
        {
          url:
            'http://localhost:3000/' +
            req.file.destination +
            '/' +
            req.file.filename,
          path: req.file.path,
        },
        '上传成功'
      )
    }
  )
})

// 大文件上传
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
router.post('/upload/big', (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, '../../static/cache')
  form.keepExtensions = true
  form.maxFileSize = 100 * 1024 * 1024 // 限制文件大小为100MB

  let uploadedBytes = 0
  let totalBytes = 0
  // 监听文件上传进度
  form.on('fileBegin', (name, file) => {
    totalBytes = file.size
  })

  form.on('data', (chunk) => {
    uploadedBytes += chunk.length
    const progress = ((uploadedBytes / totalBytes) * 100).toFixed(2)
    console.log(`Upload progress: ${progress}%`)
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send('Error uploading file.')
    }
    const file = files.file[0]
    const { hash, chunkIndex, chunkHash } = fields
    const targetDir = path.join(__dirname, `../../static/cache/${hash[0]}`)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    const url = path.join(
      __dirname,
      `../../static/cache/${hash[0]}/${chunkIndex[0]}_${chunkHash[0]}`
    )
    fs.renameSync(file.filepath, url)
    if (!file) {
      return res.status(400).send('文件上传失败！')
    }
    res.send(`File uploaded successfully: ${url}`)
  })
})

// 大文件合并
router.post('/upload/merge', (req, res) => {
  const { hash, fileName, suffix, totalSlice } = req.body
  const targetDir = path.join(__dirname, `../../static/cache/${hash}`)
  const files = fs.readdirSync(targetDir)
  if(files.length < totalSlice){
    return res.status(400).send('文件下载未完成！')
  }
  console.log('files', files)
  const writeStream = fs.createWriteStream(
    path.join(__dirname, `../../static/uploads/${fileName}_${hash}.${suffix}`)
  )
  const fileList = []
  files.forEach((item) => {
    const index = item.split('_')[0]
    const url = path.join(__dirname, `../../static/cache/${hash}/${item}`)
    fileList[index] = url
  })
  // 读取对应目录文件buffer
  fileList.forEach((url) => {
    const readFile = fs.readFileSync(url)
    writeStream.write(readFile)
    // 写入完后，清除暂存的切片文件
    fs.unlink(url, () => {})
  })
  res.send('下载完成')
})

module.exports = router
