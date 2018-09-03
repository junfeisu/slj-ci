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
        config: Joi.object().required()
      }
    },
    handler: (req, h) => {
      return addGithubWebhook(req.payload)
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
      console.log(req.params.repo)
      return getGithubWebhooks(req.params.repo)
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
