import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'

const addGithubWebhook = async (payload) => {
  try {
    const { repo, config, name, events, active, username } = payload
    const result = await fetch({
      url: `/repos/${username}/${repo}/hooks`,
      method: 'POST',
      data: {
        name,
        config,
        events,
        active,
      }
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const updateGithubWebhook = async (hookId, payload) => {
  try {
    const { repo, config, events, active, username } = payload
    const result = await fetch({
      url: `/repos/${username}/${repo}/hooks/${hookId}`,
      method: 'PATCH',
      data: {
        config,
        events,
        active
      }
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const getGithubWebhooks = async (repo) => {
  try {
    const { username, repo } = req.params
    const result = await fetch({
      url: `/repos/${username}/${repo}/hooks`
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const deleteGithubWebhook = async (params) => {
  const { username, hookId, repo } = params

  try {
    const result = await fetch({
      url: `/repos/${username}/${repo}/hooks/${hookId}`,
      method: 'DELETE'
    })

    return {status: 1, data: 'delete webhook success'}
  } catch (err) {
    errorHandle(err)
  }
}

export default {
  addGithubWebhook,
  updateGithubWebhook,
  getGithubWebhooks,
  deleteGithubWebhook,
}
