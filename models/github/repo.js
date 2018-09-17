import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'

const getRepoList = async () => {
  try {
    const result = await fetch({
      url: '/user/repos'
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const getUserRepoList = async (username) => {
  try {
    const result = await fetch({
      url: `/users/${username}/repos`
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const getOrgRepoList = async (params) => {
  const { org, type } = params
  try {
    const result = await fetch({
      url: `/orgs/${org}/repos`,
      params: {
        type
      }
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const getSingleRepo = async (params) => {
  const { username, repo } = params
  try {
    const result = await fetch({
      url: `/repos/${username}/${repo}`
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

export default {
  getRepoList,
  getUserRepoList,
  getOrgRepoList,
  getSingleRepo,
}
