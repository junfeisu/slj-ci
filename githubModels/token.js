import fetch, { updateToken } from '../utils/request/fetch'
import getBoomErrWay from '../utils/request/errorTable'
import githubConf from '../config/githubConf.json'
import gitlabConf from '../config/gitlabConf.json'
import axios from 'axios'
import userModel from '../githubModels/user'

const { getGithubUser, getGitlabUser } = userModel

const createToken = (payload) => {
  const { scopes, note } = payload
  return new Promise((resolve, reject) => {
    fetch({
      url: '/authorizations',
      method: 'POST',
      data: {
        scopes: scopes,
        note: note
      },
      auth: githubConf.auth
    }).then(result => {
      updateToken(result.data.token)
      resolve({status: 1, data: result.data})
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

const getGithubAccessToken = (code) => {
  const { client_id, client_secret } = githubConf.appInfo

  return new Promise((resolve, reject) => {
    fetch({
      host: 'https://github.com',
      url: '/login/oauth/access_token',
      method: 'POST',
      data: {
        client_id,
        client_secret,
        code
      }
    }).then(res => {
      console.log('res', res.data)
      let extractReg = /^access_token=(.+)/
      let accessToken = res.data.split('&')[0]
      
      accessToken.replace(extractReg, (match, $token) => {
        accessToken = $token
      })
      updateToken(accessToken)
      getGithubUser(resolve, reject)
    }).catch(err => {
      const { response } = err
      
      if (!response) {
        reject(getBoomErrWay('401')('auth failed'))
        return
      }

      reject(getBoomErrWay(response.status)(response.data.message))
    })
  })
}

export default {
  createToken,
  getGitlabAccessToken,
  getGithubAccessToken,
}
