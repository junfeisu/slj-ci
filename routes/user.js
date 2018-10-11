import Joi from 'joi'
import getBoomErrWay from '../utils/request/errorTable'
import query from '../utils/mysql/query'
import cryptic from '../utils/cryptic'
import tokenUtil from '../utils/token'

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
    handler: async (req, h) => {
      let { username, password } = req.payload
      const addUser = 'insert into user (username, password) values (?, ?);'
      const userParams = [username, cryptic(password)]

      try {
        const result = await query(addUser, userParams)

        return {status: 1, data: {user_id: result.insertId, username: username}}
      } catch (err) {
        return getBoomErrWay(400)(err.message)
      }
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
    handler: async (req, h) => {
      const searchUser = 'select id, username from user where username = ? and password = ?'
      const { username, password } = req.payload
      const values = [username, cryptic(password)]
      const { generateToken } = tokenUtil

      try {
        const result = await query(searchUser, values)
        if (!result.length) {
          return getBoomErrWay('400')('username or password is not right')
        }

        let token = generateToken(result[0].id)
        result[0]['token'] = token

        return {status: 1, data: result[0]}
      } catch (err) {
        return getBoomErrWay('400')(err.message)
      }
    }
  }
}

export default [
  addUser,
  userLogin,
]
