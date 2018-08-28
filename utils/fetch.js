import axios from 'axios'

const host = 'https://api.github.com'
let token = 'fc531c3917b514b5a9bf9a517cc480448d10725d'

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
