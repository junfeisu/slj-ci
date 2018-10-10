import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'

const getGitlabRepoList = async () => {
  try {
    const result = await fetch({
      url: '/projects',
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const getGitlabUserRepoList = async (user_id) => {
  try {
    const result = await fetch({
      url: `/users/${user_id}/projects`
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

const getSingleGitlabRepo = async (params) => {
  try {
    // the repo param is the repo id
    const { repo } = params
    const result = await fetch({
      url: `/projects/${repo}`,
    })
  } catch (err) {
    errorHandle(err)
  }
}

export default {
  getGitlabRepoList,
  getGitlabUserRepoList,
  getSingleGitlabRepo,
}
