import axios from 'axios'
import query from '../mysql/query'

const githubAPI = 'https://api.github.com'
let token = ''
let userId = 0

export function updateToken (newToken) {
  if (newToken && newToken !== token) {
    token = newToken
  }
}

export function updateGithubId (id) {
  if (id && !isNaN(id) && id !== userId) {
    userId = id
  }
}

const fetch = async ({
  host = githubAPI,
  url = '',
  method = 'GET',
  data = {},
  params = {},
  headers = {}
}) => {
  if (host === githubAPI) {
    if (!token) {
      const result = await query(`select access_token from github where id = ?`, [userId])
      token = result[0].access_token
    }

    headers['Authorization'] = 'token ' + token
  }

  return new Promise((resolve, reject) => {
    axios.request({
      url: host + url,
      method,
      data,
      params,
      headers
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch
