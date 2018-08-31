import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'
import query from '../../utils/mysql/query'

const getGithubUser = async (resolve, reject, token) => {
  try {
    const result = await fetch({
      url: '/user'
    })
    
    const { login, name, avatar_url, id, email } = result
    const sql = 'insert into github (id, login, name, avatar_url, email,'
      + ' access_token) values (?, ?, ?, ?, ?, ?)'
    const values = [id, login, name, avatar_url, email, token]

    await query(sql, values)

    resolve({status: 1, data: result})
  } catch (err) {
    errorHandle(reject, err)
  }
}

export default {
  getGithubUser,
}
