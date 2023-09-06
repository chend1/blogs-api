const express = require('express')
const app = express()
const port = 3000
const path = require('path')
// 参数解析
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 开放静态资源
app.use('/static',express.static(path.join(__dirname, 'static')))

// 解决跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, PUT, DELETE'
  )
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  res.send_res = (data, message, code = 200, status = 1) => {
    res.send({
      code,
      status,
      message,
      data,
    })
  }
  next()
})
// 开启token验证
const { useToken } = require('./utils/token')
app.use(useToken)

// 路由导入
const routers = require('./router')
// 路由注册
Object.keys(routers).forEach(key => {
  app.use('/api', routers[key])
})

// 捕获错误
app.use((err, req, res, next) => {
  const message = err.message
  if(message === 'jwt expired'){
    res.send_res({}, 'token过期，请重新登录', 401, 0)
    return
  }
  console.log(err)
  res.send({
    code: 400,
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
