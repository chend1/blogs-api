const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  commentSchema,
  addCommentSchema,
  editCommentSchema,
  deleteCommentSchema
} = require('../router_schema/comment')

const {
  getCommentList,
  addComment,
  editComment,
  deleteComment,
} = require('../router_handle/comment')
// 评论列表
router.get('/comment/list', (req, res, next) => {
  // 执行校验
  const { error, value } = commentSchema.validate(req['query'])
  if (error) {
    // 校验失败
    throw error
  } else {
    // 校验成功，把校验的结果重新赋值到 req 对应的 key 上
    req['query'] = value
  }
  next()
} , getCommentList)

// 新增评论
router.post(
  '/comment/add',
  expressJoi({
    body: addCommentSchema,
  }),
  addComment
)

// 修改评论
router.post(
  '/comment/edit',
  expressJoi({
    body: editCommentSchema,
  }),
  editComment
)

// 删除评论
router.post(
  '/comment/delete',
  expressJoi({
    body: deleteCommentSchema,
  }),
  deleteComment
)

module.exports = router
