
const loginRouter = require('./login')
const userRouter = require('./users')
const menuRouter = require('./menu')
const roleRouter = require('./roles')
const uploadRouter = require('./upload')
const classRouter = require('./article_class')
const articleRouter = require('./article')

module.exports = {
  loginRouter,
  userRouter,
  menuRouter,
  roleRouter,
  uploadRouter,
  articleRouter,
  classRouter
}