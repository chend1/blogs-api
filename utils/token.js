const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const SECRET_KEY = 'klsjglkfdgj;lkfdkposmedds'
const setToken = (value, time) => {
  const token = jwt.sign({ ...value }, SECRET_KEY, {
    expiresIn: time || '24h',
  })
  return token
}

const useToken = expressjwt({
  secret: SECRET_KEY,
  algorithms: ['HS256'],
}).unless({ path: [/^\/api\/login$/, '/', /^\/static\//] })

const removeToken = () => {
  setToken(null)
}

module.exports = {
  setToken,
  useToken,
  removeToken
}