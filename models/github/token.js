import fetch, { updateToken } from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'
import githubConf from '../../config/githubConf.json'
import userModel from './user'

const { getGithubUser } = userModel

const getGithubAccessToken = (code) => {
  const { client_id, client_secret } = githubConf.appInfo

  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        host: 'https://github.com',
        url: '/login/oauth/access_token',
        method: 'POST',
        data: {
          client_id,
          client_secret,
          code
        }
      })

      let extractReg = /^access_token=(.+)/
      let accessToken = res.split('&')[0]
      
      accessToken.replace(extractReg, (match, $token) => {
        accessToken = $token
      })
      updateToken(accessToken)
      getGithubUser(resolve, reject, accessToken)
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

export default {
  getGithubAccessToken,
}
