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
}) => {
  if (!token) {
    const result = await query(`select access_token from gitlab where id = ?`, ['1280736'])
    token = result.data.access_token    
  }

  return new Promise((resolve, reject) => {
    axios.request({
      url: host + url,
      method,
      data,
      params,
      headers: {
        Authorization: 'Bearer ' + token
      }
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
