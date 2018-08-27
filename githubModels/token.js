import fetch, { updateToken } from '../utils/fetch'
import getBoomErrWay from '../utils/errorTable'

const createToken = async (payload) => {
  const { scopes, note } = payload
  return new Promise((resolve, reject) => {
    fetch({
      url: '/authorizations',
      method: 'POST',
      data: {
        scopes: scopes,
        note: note
      },
      auth: {
        username: 'junfeisu',
        password: 'sjf978977'
      }
    }).then(result => {
      updateToken(result.data.token)
      resolve({status: 1, data: result.data})
    }).catch(err => {
      const { response } = err.err
      reject(getBoomErrWay(response.status)(response.data.message))
    })
  })
}

export default createToken
