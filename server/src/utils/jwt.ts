import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const sign = promisify(jwt.sign)

const verify = promisify(jwt.verify)

const decode = promisify(jwt.decode)

export {
  sign,
  verify,
  decode
}