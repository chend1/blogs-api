const express = require('express')
const app = express()
const port = 3000

// 参数解析
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 开放静态资源
app.use(express.static('static'))

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
  next()
})

// 路由导入
const { loginRouter, userRouter, menuRouter, roleRouter } = require('./router')
app.use('/api', loginRouter)
app.use('/api', userRouter)
app.use('/api', menuRouter)
app.use('/api', roleRouter)

// 捕获错误
app.use((err, req, res, next) => {
  console.log(err)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
