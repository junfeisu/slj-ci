import Joi from 'joi'
import Boom from 'boom'
import createToken from '../githubModels/token'

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

export default [
  addToken,
]
