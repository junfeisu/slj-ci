import Joi from 'joi'
import repoModel from '../models/github/repo'

const {
  getRepoList,
  getUserRepoList,
  getOrgRepoList,
  getSingleRepo,
  deleteSingleRepo
} = repoModel

const getRepos = {
  path: '/repos/github',
  method: 'GET',
  options: {
    handler: (req, h) => {
      return getRepoList()
    }
  }
}

const getUserRepos = {
  path: '/repos/github/{username}',
  method: 'GET',
  options: {
    handler: (req, h) => {
      return getUserRepoList(req.params.username)
    }
  }
}

const getOrgRepos = {
  path: '/repos/{org}/{type}',
  method: 'GET',
  options: {
    validate: {
      params: {
        org: Joi.string().min(1).required(),
        type: Joi.string().min(1)
      }
    },
    handler: (req, h) => {
      return getOrgRepoList(req.params)
    }
  }
}

const getRepo = {
  path: '/repos/github/{username}/{repo}',
  method: 'GET',
  options: {
    validate: {
      params: {
        username: Joi.string().min(1).required(),
        repo: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return getSingleRepo(req.params)
    }
  }
}

export default [
  getRepos,
  getUserRepos,
  getOrgRepos,
  getRepo,
]
