import Joi from 'joi'
import Boom from 'boom'
import webhook from '../githubModels/webhook'

const { addWebhook } = webhook
const addHook = {
  path: '/hook/add',
  method: 'POST',
  options: {
    validate: {
      payload: {
        repo: Joi.string().min(1).required(),
        name: Joi.string().min(1).required(),
        active: Joi.boolean().required(),
        events: Joi.array().required(),
        config: Joi.object().required()
      }
    },
    handler: (req, h) => {
      return addWebhook(req.payload)
    }
  }
}

export default [
  addHook,
]