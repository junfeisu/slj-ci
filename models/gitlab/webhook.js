import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'

const addGitlabWebhook = (payload) => {
  const { url, events, enable_ssl_verification } = payload

  fetch({
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
  }).then(res => {
    resolve({status: 1, data: res.data})
  }).catch(err => {
    errorHandle(reject, err.err)
  })
}

const deleteGitlabWebhook = (hookId) => {
  return new Promise((resolve, reject) => {
    fetch({
      url: `/hooks/${hookId}`,
      type: 'gitlab',
      method: 'DELETE'
    }).then(res => {
      resolve({status: 1, data: 'delete webhook success'})
    }).catch(err => {
      errorHandle(reject, err.err)
    })
  })
}

export default {
  addGitlabWebhook,
  deleteGitlabWebhook,
}
