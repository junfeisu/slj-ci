import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'

const addGithubWebhook = (payload) => {
  const { repo, config, name, events, active } = payload
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: `/repos/junfeisu/${repo}/hooks`,
        method: 'POST',
        data: {
          name,
          config,
          events,
          active,
        }
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const updateGithubWebhook = (hookId, payload) => {
  const { repo, config, events, active } = payload

  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: `/repos/junfeisu/${repo}/hooks/${hookId}`,
        method: 'PATCH',
        data: {
          config,
          events,
          active
        }
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const getGithubWebhooks = (repo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: `/repos/junfeisu/${repo}/hooks`
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const deleteGithubWebhook = (params) => {
  const { hookId, repo } = params

  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: `/repos/junfeisu/${repo}/hooks/${hookId}`,
        method: 'DELETE'
      })

      resolve({status: 1, data: 'delete webhook success'})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

export default {
  addGithubWebhook,
  updateGithubWebhook,
  getGithubWebhooks,
  deleteGithubWebhook,
}
