const express = require('express')
const router = express.Router()
// const expressJoi = require('@escook/express-joi')

const {
  getArticleData,
  getCommentData,
  getRegisterPersonData,
  getMonthArticleData,
  getMonthCommentData,
  getMonthViewData,
  getMonthStarData
} = require('./handle')

router.get('/article/data', getArticleData)

router.get('/comment/data', getCommentData)

router.get('/register/person/data', getRegisterPersonData)

router.get('/article/month/data', getMonthArticleData)

router.get('/comment/month/data', getMonthCommentData)

router.get('/view/month/data', getMonthViewData)

router.get('/star/month/data', getMonthStarData)



module.exports = router