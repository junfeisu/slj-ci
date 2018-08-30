import fetch, { updateToken } from '../../utils/request/fetch'
import getBoomErrWay from '../../utils/request/errorTable'
import gitlabConf from '../../config/gitlabConf.json'
import userModel from './user'

const { getGitlabUser } = userModel

const getGitlabAccessToken = (code) => {
  const { client_id, client_secret } = gitlabConf.appInfo

  return new Promise((resolve, reject) => {
    fetch({
      host: 'https://gitlab.com',
      url: '/oauth/token',
      method: 'POST',
      data: {
        client_id,
        client_secret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:8000'
      }
    }).then(res => {
      updateToken(res.data.access_token)
      getGitlabUser(resolve, reject)
    }).catch(err => {
      const { response } = err.err

      if (!response) {
        reject(getBoomErrWay('401')('auth failed'))
        return
      }

      reject(getBoomErrWay(response.status)(response.data.message))
    })
  })
}

export default {
  getGitlabAccessToken,
}
