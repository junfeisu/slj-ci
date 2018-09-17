import { updateGithubId } from '../utils/request/githubFetch'
import { updateGitlabId } from '../utils/request/gitlabFetch'

const interceptorPlugin = {
  name: 'interceptorPlugin',
  register: (server, options) => {
    server.ext('onRequest', (req, h) => {
      let type = ''
      req.path.replace(/git(hub|lab)/, match => {
        type = match
      })

      if (type) {
        let userId = req.headers['man-cookie'].split('=')[1]
        type === 'github' ? updateGithubId(userId) : updateGitlabId(userId)
      }
      return h.continue
    })
  }
}

export default interceptorPlugin
