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

export default {
  getGitlabRepoList,
}