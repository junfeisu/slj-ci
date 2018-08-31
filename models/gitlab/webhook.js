import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'

const addGitlabWebhook = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { url, events, enable_ssl_verification } = payload
      const result = await fetch({
        url: '/hooks',
        type: 'gitlab',
        method: 'POST',
        data: {
          url,
          push_events: events.indexOf('push_events') >= 0,
          tag_push_events: events.indexOf('tag_push_events') >= 0,
          merge_requests_events: events.indexOf('merge_request_events') >= 0,
          repository_update_events: events.indexOf('repository_update_events') >= 0,
          enable_ssl_verification
        }
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err.err)
    }
  })
}

const deleteGitlabWebhook = (hookId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch({
        url: `/hooks/${hookId}`,
        type: 'gitlab',
        method: 'DELETE'
      })
      
      resolve({status: 1, data: 'delete webhook success'})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

export default {
  addGitlabWebhook,
  deleteGitlabWebhook,
}
