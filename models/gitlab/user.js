import fetch from '../../utils/request/fetch'
import getBoomErrWay from '../../utils/request/errorTable'
import connection from '../../utils/mysql/mysqlConnection'

const getGitlabUser = (resolve, reject) => {
  fetch({
    url: '/user',
    type: 'gitlab'
  }).then(res => {
    const { username, name, avatar_url, id, email } = res.data

    connection.query({
      sql: 'insert into gitlab (id, username, name, avatar_url, email) values (?, ?, ?, ?, ?)',
      values: [id, username, name, avatar_url, email]
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
  getGitlabUser,
}
