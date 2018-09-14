import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'
import query from '../../utils/mysql/query'

const getGitlabUser = async (resolve, reject, token) => {
  try {
    const result = await fetch({
      url: '/user'
    })

    const { username, name, avatar_url, id, email } = result
    const insert = 'insert into gitlab (id, username, name, avatar_url, email,'
      + ' access_token) values (?, ?, ?, ?, ?, ?)'
    const insertValues = [id, username, name, avatar_url, email, token]
    const search = 'select * from gitlab where id=?'
    const update = 'update gitlab set access_token=? where id=?'
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
  getGitlabUser,
}
