const Joi = require('joi')


const deleteFileSchema = {
  id: Joi.number().required().error(new Error('id不能为空')),
  path: Joi.string().required().error(new Error('文件路径不能为空')),
}

module.exports = {
  deleteFileSchema
}