import axios from 'axios'
import query from '../mysql/query'

const githubAPI = 'https://api.github.com'
let token = ''

export function updateToken (newToken) {
  if (newToken && newToken !== token) {
    token = newToken
  }
}

const fetch = async ({
  host = githubAPI,
  url = '',
  method = 'GET',
  data = {},
  params = {}
}) => {
  if (!token) {
    const result = await query(`select access_token from github where id = ?`, ['17267658'])
    token = result.data.access_token    
  }

  return new Promise((resolve, reject) => {
    axios.request({
      url: host + url,
      method,
      data,
      params,
      headers: {
        Authorization: 'token ' + token
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch
