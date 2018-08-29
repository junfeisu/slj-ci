import axios from 'axios'

const host = 'https://api.github.com'
// let token = 'c953aa2c6a22f53a8474780f79bcb0095d51c103'
let token = ''

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
