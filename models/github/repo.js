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
  // user param is the username
  // repo param is the repo name
  const { user, repo } = params
  try {
    const result = await fetch({
      url: `/repos/${user}/${repo}`
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
