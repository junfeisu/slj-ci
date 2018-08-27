import axios from 'axios'

const host = 'https://api.github.com'
let token = ''

export function updateToken (newToken) {
  if (newToken && newToken !== token) {
    token = newToken
  }
}

const fetch = async ({url = '', method = 'GET', data = {}, params = {}, auth = {}}) => {
  return new Promise((resolve, reject) => {
    axios.request({
      url: host + url,
      method,
      data,
      params,
      headers: {
        Authorization: token
      },
      auth
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch
