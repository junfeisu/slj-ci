import fetch from '../../utils/request/gitlabFetch'
import getBoomErrWay from '../../utils/request/errorTable'

const getRepoList = (id) => {
  return new Promise((resolve, reject) => {
    fetch({
      path: `/projects/${id}/repository/tree`,
      type: 'gitlab'
    }).then(res => {

    }).catch(err => {
      const { response } = err.err

      if (!response) {
        reject(getBoomErrWay('401')('auth failed'))
        return
      }

      reject(getBoomErrWay(response.status)(response.data.message))
    })
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