import fetch from '../../utils/request/githubFetch'
import getBoomErrWay from '../../utils/request/errorTable'

const getRepoList = () => {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/user/repos'
    }).then(res => {
      resolve({status: 1, data: res.data})
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

const getUserRepoList = () => {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/users/junfeisu/repos'
    }).then(res => {
      resolve({status: 1, data: res.data})
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

const getOrgRepoList = (params) => {
  const { org, type } = params
  return new Promise((resolve, reject) => {
    fetch({
      url: `/orgs/${org}/repos`,
      params: {
        type
      }
    }).then(res => {
      resolve({status: 1, data: res.data})
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

const getSingleRepo = (repo) => {
  return new Promise((resolve, reject) => {
    fetch({
      url: `/repos/junfeisu/${repo}`,
    }).then(res => {
      resolve({status: 1, data: res.data})
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

const deleteSingleRepo = (repo) => {
  return new Promise((resolve, reject) => {
    fetch({
      url: `/repos/junfeisu/${repo}`,
      method: 'DELETE'
    }).then(res => {
      resolve({status: 1, data: `delete repo ${repo} success`})
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

export default {
  getRepoList,
  getUserRepoList,
  getOrgRepoList,
  getSingleRepo,
  deleteSingleRepo
}
