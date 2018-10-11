import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'
import query from '../../utils/mysql/query'
import tokenUtil from '../../utils/token'

const getGithubUser = async (token, userId) => {
  try {
    const result = await fetch({
      url: '/user'
    })
    
    const { generateToken } = tokenUtil
    const { login, name, avatar_url, id, email } = result
    const insertGithub = 'insert into github (id, username, name, avatar_url, email,'
      + ' access_token) values (?, ?, ?, ?, ?, ?)'
    const insertUser = 'insert into user (github_id) values (?)'
    const githubValues = [id, login, name, avatar_url, email, token]

    // user is not logging in for the first time
    if (userId) {
      const searchGithub = 'select github_id from user where id = ?'
      const searchResult = await query(searchGithub, [userId])

      // user has authed gitlab
      if (searchResult[0].github_id) {
        const updateGithub = 'update github set access_token = ? where id = ?'
        const updateGithubValues = [token, id]
        
        await query(updateGithub, updateGithubValues)
      } else {
        // user does not auth the gitlab
        const updateUser = 'update user set github_id = ? where id = ?'
        const updateUserValues = [id, userId]

        await query(updateUser, updateUserValues)
        await query(insertGithub, githubValues)
      }
    } else {
      // This is a new user
      const newUser = await query(insertUser, [id])
      await query(insertGithub, githubValues)
      
      userId = newUser.insertId
    }

    // add the authorization token
    let userToken = generateToken(userId)

    return {status: 1, data: {id: userId, token: userToken, githubUser: result}}
  } catch (err) {
    console.log(err)
    errorHandle(err)
  }
}

export default {
  getGithubUser,
}
