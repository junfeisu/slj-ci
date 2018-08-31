import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'

const getRepoList = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = fetch({
        path: `/projects/${id}/repository/tree`,
        type: 'gitlab'
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const getSingleRepo = () => {
  return new Promise((resolve, reject) => {
    fetch({
      url: `/projects/${id}/repository/archive`,
      type: 'gitlab'
    })
  })
}

export default {
  getRepoList,
}