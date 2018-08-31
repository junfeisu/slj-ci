import Joi from 'joi'
import getBoomErrWay from '../utils/request/errorTable'
import tokenUtil from '../utils/request/token'
import query from '../utils/mysql/query'
import cryptic from '../utils/cryptic'

const { generateToken } = tokenUtil

const addUser = {
  path: '/user/add',
  method: 'PUT',
  options: {
    validate: {
      payload: {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(6).required(),
      }
    },
    handler: (req, h) => {
      return new Promise(async (resolve, reject) => {
        let { username, password } = req.payload
        password = cryptic(password)
        const addUser = 'insert into user (username, password) values (?, ?);'
        const userParams = [username, password]

        try {
          const result = await query(addUser, userParams)

          resolve({status: 1, data: user})
        } catch (err) {
          reject(getBoomErrWay(400)(err.message))
        }
      })
    }
  }
}

const userLogin = {
  path: '/user/login',
  method: 'POST',
  options: {
    validate: {
      payload: {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(6).required()
      }
    },
    handler: (req, h) => {
      return new Promise(async (resolve, reject) => {
        const searchUser = 'select user_id, username, access_token, auth from user where username = ? and password = ?'
        const { username, password } = req.payload
        const values = [username, cryptic(password)]

        try {
          const result = await query(searchUser, values)

          if (!result.length) {
            reject(getBoomErrWay('400')('username or password is not right'))
          }

          result[0]['token'] = generateToken(result[0].user_id, '1d')

          resolve({status: 1, data: result[0]})
        } catch (err) {
          reject(getBoomErrWay('400')(err.message))
        }
      })
    }
  }
}

export default [
  addUser,
  userLogin,
]
