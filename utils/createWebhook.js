import axios from 'axios'

const host = 'https://api.github.com'
const token = '04140695bb0f2f6c7d0bcc0fe11fd5d1aad50d75'

const createWebhook = async () => {
  try {
    const result = await axios.request({
      url: host + '/repos/junfeisu/slj-backend/hooks',
      method: 'POST',
      headers: {
        Authorization: 'token ' + token
      },
      data: {
        name: 'web',
        config: {
          url: 'http://test.com/webhook',
          content_type: 'json'
        },
      }
    })
    console.log('result', result.data)
  } catch (err) {
    console.log('err', err)
  }
}

export default createWebhook
