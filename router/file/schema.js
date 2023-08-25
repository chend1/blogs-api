const Joi = require('joi')


const deleteFileSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
}

module.exports = {
  deleteFileSchema
}