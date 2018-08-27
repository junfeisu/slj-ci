import Joi from 'joi'
import Boom from 'boom'

const githubAPI = {
  path: '/token',
  method: 'PUT',
  handler: (req, h) => {
    return 'This is index API'
  }
}

export default [
  testApi,
]
