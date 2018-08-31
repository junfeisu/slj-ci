import fetch from '../../utils/request/githubFetch'
import getBoomErrWay from '../../utils/request/errorTable'

const addGithubWebhook = (payload) => {
  const { repo, config, name, events, active } = payload
  return new Promise((resolve, reject) => {
    fetch({
      url: `/repos/junfeisu/${repo}/hooks`,
      method: 'POST',
      data: {
        name,
        config,
        events,
        active,
      }
    }).then(res => {
      resolve({status: 1, data: res.data})
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

const updateGithubWebhook = (hookId, payload) => {
  const { repo, config, events, active } = payload

  return new Promise((resolve, reject) => {
    fetch({
      url: `/repos/junfeisu/${repo}/hooks/${hookId}`,
      method: 'PATCH',
      data: {
        config,
        events,
        active
      }
    }).then(res => {
      resolve({status: 1, data: res.data})
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

const getGithubWebhooks = (repo) => {
  return new Promise((resolve, reject) => {
    fetch({
      url: `/repos/junfeisu/${repo}/hooks`
    }).then(res => {
      resolve({status: 1, data: res.data})
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

const deleteGithubWebhook = (params) => {
  const { hookId, repo } = params

  return new Promise((resolve, reject) => {
    fetch({
      url: `/repos/junfeisu/${repo}/hooks/${hookId}`,
      method: 'DELETE'
    }).then(res => {
      resolve({status: 1, data: 'delete webhook success'})
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

export default {
  addGithubWebhook,
  updateGithubWebhook,
  getGithubWebhooks,
  deleteGithubWebhook,
}
