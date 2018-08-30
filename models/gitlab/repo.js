import fetch from '../../utils/request/fetch'
import getBoomErrWay from '../../utils/request/errorTable'

const getRepoList = () => {
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
  
}

export default {
  getRepoList,
}