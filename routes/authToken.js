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
    handler: async (req, h) => {
      try {
        const { type, code } = req.params
        const result = type === 'github'
          ? await getGithubAccessToken(code)
          : await getGitlabAccessToken(code)

        return h.response(result).header('Cookie', result.data.id)
        // return h.response(result).header('Set-Cookie', `userId=${result.data.id};isVisit=true;domain=http://10.232.55.210:8080;path=/`)
      } catch (err) {
        return err
      }
    }
  }
}

export default [
  getAccessToken,
]
