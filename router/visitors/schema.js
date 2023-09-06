const Joi = require('joi')

const visitorsEditSchema = {
  status: Joi.number().required().error(new Error('状态不能为空')),
  id: Joi.number().required().error(new Error('id不能为空')),
}

const deleteVisitorsSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}
const resetPasswordSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

const infoSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}
module.exports = {
  deleteVisitorsSchema,
  visitorsEditSchema,
  resetPasswordSchema,
  infoSchema
}
