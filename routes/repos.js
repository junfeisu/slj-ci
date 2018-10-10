import Joi from 'joi'
import githubRepoModel from '../models/github/repo'
import gitlabRepoModel from '../models/gitlab/repo'

const {
  getRepoList,
  getUserRepoList,
  getOrgRepoList,
  getSingleRepo,
  deleteSingleRepo
} = githubRepoModel

const { getGitlabRepoList, getGitlabUserRepoList, getGitlabSingleRepo } = gitlabRepoModel

const getRepos = {
  path: '/repos/{type}',
  method: 'GET',
  options: {
    handler: (req, h) => {
      const { type } = req.params
      return type === 'github' ? getRepoList() : getGitlabRepoList()
    }
  }
}

/*
 @user githubAPI need username | gitlanAPI need user id
 */
const getUserRepos = {
  path: '/repos/github/{type}/{user}',
  method: 'GET',
  options: {
    handler: (req, h) => {
      const { type, user } = req.params
      return type === 'github' ? getUserRepoList(user) : getGitlabUserRepoList(user)
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
/*
 @type distinguish the github and gitlab
 @user githubAPI need username | gitlabAPI don't need
 @repo githubAPI need repo name | gitlanAPI need repo id
 */
const getRepo = {
  path: '/repos/{type}/{user}/{repo}',
  method: 'GET',
  options: {
    handler: (req, h) => {
      const { type } = req.params
      return type === 'github' ? getSingleRepo(req.params) : getGitlabSingleRepo(req.params)
    }
  }
}

export default [
  getRepos,
  getUserRepos,
  getOrgRepos,
  getRepo,
]
