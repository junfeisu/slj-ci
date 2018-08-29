import Joi from 'joi'
import Boom from 'boom'
import tokenModel from '../githubModels/token'

const { createToken, getAccessToken } = tokenModel

const addToken = {
  path: '/token/add',
  method: 'PUT',
  options: {
    validate: {
      payload: {
        scopes: Joi.array(),
        note: Joi.string().required()
      }
    },
    handler: (req, h) => {
      return createToken(req.payload)
    }
  }
}

const getToken = {
  path: '/token/{code}',
  method: 'GET',
  options: {
    validate: {
      params: {
        code: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return getAccessToken(req.params.code)
    }
  }
}

export default [
  addToken,
  getToken,
]
