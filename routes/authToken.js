import Joi from 'joi'
import Boom from 'boom'
import githubTokenModel from '../models/github/token'
import gitlabTokenModel from '../models/gitlab/token'

const { getGithubAccessToken } = githubTokenModel
const { getGitlabAccessToken } = gitlabTokenModel

const getAccessToken = {
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
  getAccessToken,
]
