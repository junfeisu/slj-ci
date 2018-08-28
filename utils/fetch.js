import axios from 'axios'

const host = 'https://api.github.com'
let token = '93158c22943476c33b58523c0e3526c0716d6d23'

export function updateToken (newToken) {
  if (newToken && newToken !== token) {
    token = newToken
  }
}

const fetch = ({url = '', method = 'GET', data = {}, params = {}, auth = null}) => {
  return new Promise((resolve, reject) => {
    axios.request({
      url: host + url,
      method,
      data,
      params,
      headers: {
        Authorization: 'token ' + token
      },
      auth
    }).then(response => {
      resolve({
        status: 1,
        data: response.data
      })
    }).catch(err => {
      reject({
        status: 0,
        err: err
      })
    })
  })
}

export default fetch
