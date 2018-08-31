import fetch from '../../utils/request/githubFetch'
import errorHandle from '../../utils/request/errorHandle'

const getRepoList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: '/user/repos'
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const getUserRepoList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: '/users/junfeisu/repos'
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const getOrgRepoList = (params) => {
  const { org, type } = params
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: `/orgs/${org}/repos`,
        params: {
          type
        }
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const getSingleRepo = (repo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch({
        url: `/repos/junfeisu/${repo}`
      })

      resolve({status: 1, data: result})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

const deleteSingleRepo = (repo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch({
        url: `/repos/junfeisu/${repo}`,
        method: 'DELETE'
      })

      resolve({status: 1, data: `delete repo ${repo} success`})
    } catch (err) {
      errorHandle(reject, err)
    }
  })
}

export default {
  getRepoList,
  getUserRepoList,
  getOrgRepoList,
  getSingleRepo,
  deleteSingleRepo
}
