import fetch, { updateToken } from '../utils/request/fetch'
import getBoomErrWay from '../utils/request/errorTable'
import githubConf from '../config/githubConf.json'

const createToken = (payload) => {
  const { scopes, note } = payload
  return new Promise((resolve, reject) => {
    fetch({
      url: '/authorizations',
      method: 'POST',
      data: {
        scopes: scopes,
        note: note
      },
      auth: githubConf
    }).then(result => {
      updateToken(result.data.token)
      resolve({status: 1, data: result.data})
    }).catch(err => {
      const { response } = err.err

      if (!response) {
        reject(getBoomErrWay('401')('auth failed'))
        return
      }
      reject(getBoomErrWay(response.status)(response.data.message))
    })
  })
}

export default createToken
