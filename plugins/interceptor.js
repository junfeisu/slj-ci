import { updateGithubId } from '../utils/request/githubFetch'
import { updateGitlabId } from '../utils/request/gitlabFetch'
import tokenUtil from '../utils/token'

// API does not need token verification
const ignorePaths = ['token', 'deploy', 'user/add', 'user/login']

const interceptorPlugin = {
  name: 'interceptorPlugin',
  register: (server, options) => {
    server.ext('onRequest', (req, h) => {
      let requestPath = req.path
      let isIgnore = false

      for (let i = 0, ignorePathsLen = ignorePaths.length; i < ignorePathsLen; i++) {
        if (requestPath.includes(ignorePaths[i])) {
          isIgnore = true
          break
        }
      }

      // verify the token
      if (!isIgnore) {
        let headers = req.headers
        if (!headers.hasOwnProperty('authorization')) {
          return h.response('you can\'t access the API without login').code(403).takeover()
        }

        let token = headers['authorization']
        let userId = headers['man-cookie'].split('=')[1]

        let verifyTokenResult = tokenUtil.verifyToken(token, userId)
        if (!verifyTokenResult.isValid) {
          return h.response(verifyTokenResult.message).code(400).takeover()
        }

        // update the github | gitlab access token
        let type = ''
        requestPath.replace(/git(hub|lab)/, match => {
          type = match
        })

        if (type && headers['man-cookie']) {
          type === 'github' ? updateGithubId(userId) : updateGitlabId(userId)
        }
      }

      return h.continue
    })
  }
}

export default interceptorPlugin
