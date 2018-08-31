import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'

const getRepoList = () => {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/user/repos'
    }).then(res => {
      resolve({status: 1, data: res.data})
    }).catch(err => {
      errorHandle(reject, err.err)
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
      errorHandle(reject, err.err)
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
      errorHandle(reject, err.err)
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
      errorHandle(reject, err.err)
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
      errorHandle(reject, err.err)
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
