import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'

const getRepoList = async (id) => {
  try {
    const result = await fetch({
      path: `/projects/${id}/repository/tree`,
      type: 'gitlab'
    })

    return {status: 1, data: result}
  } catch (err) {
    errorHandle(err)
  }
}

export default {
  getRepoList,
}