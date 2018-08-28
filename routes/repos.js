import Joi from 'joi'
import repoModel from '../githubModels/repo'

const {
  getRepoList,
  getUserRepoList,
  getOrgRepoList,
  getSingleRepo,
  deleteSingleRepo
} = repoModel

const getRepos = {
  path: '/repos',
  method: 'GET',
  options: {
    handler: (req, h) => {
      return getRepoList()
    }
  }
}

const getUserRepos = {
  path: '/repos/user',
  method: 'GET',
  options: {
    handler: (req, h) => {
      return getUserRepoList()
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
  path: '/repos/{repo}',
  method: 'GET',
  options: {
    validate: {
      params: {
        repo: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return getSingleRepo(req.params.repo)
    }
  }
}

const deleteRepo = {
  path: '/repos/{repo}',
  method: 'DELETE',
  options: {
    validate: {
      params: {
        repo: Joi.string().min(1).required()
      }
    },
    handler: (req, h) => {
      return deleteSingleRepo(req.params.repo)
    }
  }
}

export default [
  getRepos,
  getUserRepos,
  getOrgRepos,
  getRepo,
]
