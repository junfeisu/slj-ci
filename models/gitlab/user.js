import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'
import query from '../../utils/mysql/query'

const getGitlabUser = async (resolve, reject, token) => {
  try {
    const result = await fetch({
      url: '/user'
    })

    const { username, name, avatar_url, id, email } = result
    const sql = 'insert into gitlab (id, username, name, avatar_url, email,'
      + ' access_token) values (?, ?, ?, ?, ?, ?)'
    const values = [id, username, name, avatar_url, email, token]

    await query(sql, values)
    
    resolve({status: 1, data: result})    
  } catch (err) {
    errorHandle(reject, err)
  }
}

export default {
  getGitlabUser,
}
