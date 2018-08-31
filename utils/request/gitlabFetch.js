import axios from 'axios'
import query from '../mysql/query'

const gitlabAPI = 'https://gitlab.com/api/v4'
let token = ''

export function updateToken (newToken) {
  if (newToken && newToken !== token) {
    token = newToken
  }
}

const fetch = async ({
  host = gitlabAPI,
  url = '',
  method = 'GET',
  data = {},
  params = {},
  headers = {}
}) => {
  if (host === gitlabAPI) {
    if (!token) {
      const result = await query(`select access_token from gitlab where id = ?`, ['1280736'])
      token = result[0].access_token
    }

    headers['Authorization'] = 'Bearer ' + token
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
