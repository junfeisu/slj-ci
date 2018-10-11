import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'
import query from '../../utils/mysql/query'
import tokenUtil from '../../utils/token'

const getGitlabUser = async (token, userId) => {
  try {
    const result = await fetch({
      url: '/user'
    })

    const { generateToken } = tokenUtil
    const { username, name, avatar_url, id, email } = result
    const insert = 'insert into gitlab (id, username, name, avatar_url, email,'
      + ' access_token) values (?, ?, ?, ?, ?, ?)'
    const gitlabValues = [id, username, name, avatar_url, email, token]
    const insertUser = 'insert into user (gitlab_id) values (?)'

    if (userId) {
      const searchGitlab = 'select gitlab_id from user where id = ?'
      const searchResult = await query(searchGitlab, [userId])

      if (searchResult[0].gitlab_id) {
        const updateGitlab = 'update gitlab set access_token = ? where id = ?'
        const updateGitlabValues = [token, id]
        
        await query(updateGitlab, updateGitlabValues)
      } else {
        const updateUser = 'update user set gitlab_id = ? where id = ?'
        const updateUserValues = [id, userId]

        await query(updateUser, updateUserValues)
        await query(insert, gitlabValues)
      }
    } else {
      const newUser = await query(insertUser, [id])
      await query(insert, gitlabValues)

      userId = newUser.insertId
    }

    let userToken = generateToken(userId)
    
    return {status: 1, data: {id: userId, token: userToken, gitlabUser: result}}
  } catch (err) {
    errorHandle(err)
  }
}

export default {
  getGitlabUser,
}
