import fetch, { updateToken } from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'
import gitlabConf from '../../config/gitlabConf.json'
import userModel from './user'

const { getGitlabUser } = userModel

const getGitlabAccessToken = async (code) => {
  try {
    const { client_id, client_secret } = gitlabConf.appInfo
    const result = await fetch({
      host: 'https://gitlab.com',
      url: '/oauth/token',
      method: 'POST',
      data: {
        client_id,
        client_secret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:8080/code'
      }
    })

    updateToken(result.access_token)
    return getGitlabUser(result.access_token)
  } catch (err) {
    errorHandle(err)
  }
}

export default {
  getGitlabAccessToken,
}
