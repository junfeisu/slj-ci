import axios from 'axios'

const host = 'https://api.github.com'
let token = '4fd8884c9bbd5180e59bf4c82797503b0ef64ecb'

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
