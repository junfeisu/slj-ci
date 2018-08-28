import Joi from 'joi'
import Boom from 'boom'
import webhook from '../githubModels/webhook'

const { addWebhook, updateWebhook, getWebhooks, deleteWebhook } = webhook

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

const updateHook = {
  path: '/hook/update/{hookId}',
  method: 'POST',
  options: {
    validate: {
      params: {
        hookId: Joi.number().integer().min(1).required()
      },
      payload: {
        events: Joi.array().required(),
        active: Joi.boolean().required(),
        config: Joi.object().required(),
        repo: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return updateWebhook(req.params.hookId, req.payload)
    }
  }
}

const getHooks = {
  path: '/hook/list/{repo}',
  method: 'GET',
  options: {
    validate: {
      params: {
        repo: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return getWebhooks(req.params.repo)
    }
  }
}

const deleteHook = {
  path: '/hook/{repo}/{hookId}',
  method: 'DELETE',
  options: {
    validate: {
      params: {
        repo: Joi.string().min(1).required(),
        hookId: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, h) => {
      return deleteWebhook(req.params)
    }
  }
}

export default [
  addHook,
  updateHook,
  getHooks,
  deleteHook,
]
