import fetch from '../../utils/request/gitlabFetch'
import errorHandle from '../../utils/request/errorHandle'

const getRepoList = (id) => {
  return new Promise((resolve, reject) => {
    fetch({
      path: `/projects/${id}/repository/tree`,
      type: 'gitlab'
    }).then(res => {

    }).catch(err => {
      errorHandle(reject, err.err)
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