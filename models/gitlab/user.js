import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'
import connection from '../../utils/mysql/mysqlConnection'

const getGitlabUser = (resolve, reject, token) => {
  fetch({
    url: '/user',
    type: 'gitlab'
  }).then(res => {
    const { username, name, avatar_url, id, email } = res.data

    connection.query({
      sql: 'insert into gitlab (id, username, name, avatar_url, email, access_token) values (?, ?, ?, ?, ?, ?)',
      values: [id, username, name, avatar_url, email, token]
    }, (err, result) => {
      if (err) {
        reject(getBoomErrWay('400')(err.message))
        return
      }

      resolve({status: 1, data: res.data})
    })
  }).catch(err => {
    errorHandle(reject, err.err)
  })
}

export default {
  getGitlabUser,
}
