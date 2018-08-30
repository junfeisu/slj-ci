import axios from 'axios'

const githubAPI = 'https://api.github.com'
const gitlabAPI = 'https://gitlab.com/api/v4'
let token = ''

export function updateToken (newToken) {
  if (newToken && newToken !== token) {
    token = newToken
  }
}

const fetch = ({
  host,
  url = '',
  method = 'GET',
  data = {},
  params = {},
  auth = null,
  type = 'github'
}) => {
  if (!host) {
    host = type === 'github' ? githubAPI : gitlabAPI
  }
  return new Promise((resolve, reject) => {
    axios.request({
      url: host + url,
      method,
      data,
      params,
      headers: {
        Authorization: type === 'github' ? 'Bearer ' + token : 'token ' + token
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
