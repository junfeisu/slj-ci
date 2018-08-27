import fetch from '../utils/fetch'
import getBoomErrWay from '../utils/errorTable'

const addWebhook = (payload) => {
  const { repo, config, name, events, active } = payload
  return new Promise((resolve, reject) => {
    fetch({
      url: `/repos/junfeisu/${repo}/hooks`,
      method: 'POST',
      data: {
        name,
        config,
        events,
        active
      }
    }).then(res => {
      resolve({status: 1, data: res.data})
    }).catch(err => {
      const { response } = err.err
      if (!response) {
        reject(getBoomErrWay('401')('token invalid'))
        return
      }
      reject(getBoomErrWay(response.status)(response.data.message))
    })
  })
}

export default {
  addWebhook: addWebhook
}