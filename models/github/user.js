import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'
import query from '../../utils/mysql/query'

const getGithubUser = async (resolve, reject, token) => {
  try {
    const result = await fetch({
      url: '/user'
    })
    
    const { login, name, avatar_url, id, email } = result
    const insert = 'insert into github (id, login, name, avatar_url, email,'
      + ' access_token) values (?, ?, ?, ?, ?, ?)'
    const search = 'select * from github where id=?'
    const update = 'update github set access_token=? where id=?'
    const insertValues = [id, login, name, avatar_url, email, token]
    const searchValue = [id]
    const updateValues = [token, id]

    const searchResult = await query(search, searchValue)
    if (searchResult.length) {
      await query(update, updateValues)
    } else {
      await query(insert, insertValues)
    }

    resolve({status: 1, data: result})
  } catch (err) {
    errorHandle(reject, err)
  }
}

export default {
  getGithubUser,
}
