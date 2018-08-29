import Joi from 'joi'
import getBoomErrWay from '../utils/request/errorTable'
import tokenUtil from '../utils/request/token'
import connection from '../utils/mysql/mysqlConnection'
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
      return new Promise((resolve, reject) => {
        let { username, password } = req.payload
        password = cryptic(password)
        const addUser = 'insert into user (username, password) values (?, ?);'
        const userParams = [username, password]

        connection.query(addUser, userParams, (err, user) => {
          if (err) {
            reject(getBoomErrWay(400)(err.message))
            return
          }

          resolve({status: 1, data: user})
        })
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
        const { username, password } = req.payload
        const searchUser = 'select user_id, username, access_token, auth from user where username = ? and password = ?'
        
        connection.query({sql: searchUser, values: [username, cryptic(password)]}, (err, result) => {
          if (err) {
            reject(getBoomErrWay('400')(err.message))
            return
          }

          if (!result.length) {
            reject(getBoomErrWay('400')('username or password is not right'))
          }

          result[0]['token'] = generateToken(result[0].user_id, '1d')

          resolve({status: 1, data: result[0]})
        })
      })
    }
  }
}

export default [
  addUser,
  userLogin,
]
