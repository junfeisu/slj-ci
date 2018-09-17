import Joi from 'joi'
import githubWebhookModel from '../models/github/webhook'
import gitlabWebhookModel from '../models/github/webhook'

const { addGithubWebhook, updateGithubWebhook, getGithubWebhooks, deleteGithubWebhook } = githubWebhookModel
const { addGitlabWebhook, deleteGitlabWebhook } = gitlabWebhookModel

const addHook = {
  path: '/hook/github',
  method: 'POST',
  options: {
    validate: {
      payload: {
        repo: Joi.string().min(1).required(),
        name: Joi.string().min(1).required(),
        active: Joi.boolean().required(),
        events: Joi.array().required(),
        config: Joi.object().required(),
        username: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return addGithubWebhook(req.payload)
    }
  }
}

const updateHook = {
  path: '/hook/github/update/{hookId}',
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
        repo: Joi.string().min(1).required(),
        username: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return updateGithubWebhook(req.params.hookId, req.payload)
    }
  }
}

const getHooks = {
  path: '/hook/list/github/{username}/{repo}',
  method: 'GET',
  options: {
    validate: {
      params: {
        username: Joi.string().min(1).required(),
        repo: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return getGithubWebhooks(req.params)
    }
  }
}

const deleteHook = {
  path: '/hook/github/{username}/{repo}/{hookId}',
  method: 'DELETE',
  options: {
    validate: {
      params: {
        username: Joi.string().min(1).required(),
        repo: Joi.string().min(1).required(),
        hookId: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, h) => {
      return deleteGithubWebhook(req.params)
    }
  }
}

const addGitlabHook = {
  path: '/hook/gitlab',
  method: 'POST',
  options: {
    validate: {
      payload: {
        url: Joi.string().regex(/http(s)?:\/\/.+/).required(),
      }
    },
    handler: (req, h) => {
      return addGitlabWebhook(req.payload)
    }
  }
}

const deleteGitlabHook = {
  path: '/hook/gitlab/{hookId}',
  method: 'DELETE',
  options: {
    validate: {
      params: {
        hookId: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, h) => {
      return deleteGitlabWebhook(req.params.hookId)
    }
  }
}

export default [
  addHook,
  updateHook,
  getHooks,
  deleteHook,
  addGitlabHook,
  deleteGitlabHook,
]
