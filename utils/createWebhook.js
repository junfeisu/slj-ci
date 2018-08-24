import axios from 'axios'

const host = 'https://api.github.com/repos'

const createWebhook = async () => {
  try {
    const result = await axios.request({
      url: host + '/junfeisu/slj-backend/hooks',
      method: 'POST',
      data: {
        name: 'web',
        config: {
          url: 'http://test.com/webhook',
          content_type: 'json'
        },
      }
    })
    console.log('result', result.response)
  } catch (err) {
    console.log('err', err)
  }
  
}

export default createWebhook
