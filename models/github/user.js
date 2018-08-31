import fetch from '../../utils/request/githubFetch'
import getBoomErrWay from '../../utils/request/errorTable'
import connection from '../../utils/mysql/mysqlConnection'

const getGithubUser = (resolve, reject, token) => {
  fetch({
    url: '/user'
  }).then(res => {
    const { login, name, avatar_url, id, email } = res.data

    connection.query({
      sql: 'insert into github (id, login, name, avatar_url, email, access_token) values (?, ?, ?, ?, ?, ?)',
      values: [id, login, name, avatar_url, email, token]
    }, (err, result) => {
      if (err) {
        reject(getBoomErrWay('400')(err.message))
        return
      }

      resolve({status: 1, data: res.data})
    })
  }).catch(err => {
    const { response } = err.err

    if (!response) {
      reject(getBoomErrWay('401')('auth failed'))
      return
    }

    reject(getBoomErrWay(response.status)(response.data.message))
  })
}

export default {
  getGithubUser,
}
