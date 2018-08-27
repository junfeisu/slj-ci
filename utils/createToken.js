import fetch, { updateToken } from './fetch'

const createToken = async () => {
  const result = await fetch({
    url: '/authorizations',
    method: 'POST',
    data: {
      scopes: ["repo", "user"],
      note: 'this is for test'
    },
    auth: {
      username: 'junfeisu',
      password: 'sjf978977'
    }
  })

  console.log(result)
}

export default createToken
