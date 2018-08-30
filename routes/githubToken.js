import Joi from 'joi'
import Boom from 'boom'
import tokenModel from '../githubModels/token'

const { createToken, getGithubAccessToken, getGitlabAccessToken } = tokenModel

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
  path: '/token/{type}/{code}',
  method: 'GET',
  options: {
    validate: {
      params: {
        type: Joi.string().regex(/^git(hub|lab)$/).required(),
        code: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      const { type, code } = req.params

      return type === 'github' ? getGithubAccessToken(code) : getGitlabAccessToken(code)
    }
  }
}

export default [
  addToken,
  getToken,
]
