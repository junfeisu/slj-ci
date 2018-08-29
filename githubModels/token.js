import fetch, { updateToken } from '../utils/request/fetch'
import getBoomErrWay from '../utils/request/errorTable'
import githubConf from '../config/githubConf.json'
import axios from 'axios'

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

const getAccessToken = (code) => {
  const { client_id, client_secret } = githubConf.appInfo
  return new Promise((resolve, reject) => {
    axios.post(`https://github.com/login/oauth/access_token`, {
      client_id,
      client_secret,
      code
    }).then(res => {
      console.log(res.data)
      resolve({status: 1, data: res.data})
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
  getAccessToken,
}
