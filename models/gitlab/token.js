import fetch, { updateToken } from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'
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
      },
      type: 'gitlab'
    }).then(res => {
      updateToken(res.data.access_token)
      getGitlabUser(resolve, reject, res.data.access_token)
    }).catch(err => {
      errorHandle(reject, err.err)
    })
  })
}

export default {
  getGitlabAccessToken,
}
