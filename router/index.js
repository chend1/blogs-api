
const loginRouter = require('./login')
const userRouter = require('./users')
const menuRouter = require('./menu')
const roleRouter = require('./roles')
const uploadRouter = require('./upload')
const classRouter = require('./article_class')
const articleRouter = require('./article')
const tagsRouter = require('./tags')
const commentRouter = require('./comment')
const linkRouter = require('./link')
const fileRouter = require('./file')

module.exports = {
  loginRouter,
  userRouter,
  menuRouter,
  roleRouter,
  uploadRouter,
  articleRouter,
  classRouter,
  tagsRouter,
  commentRouter,
  linkRouter,
  fileRouter
}