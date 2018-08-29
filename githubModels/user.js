import fetch from '../utils/request/fetch'
import getBoomErrWay from '../utils/request/errorTable'
import connection from '../utils/mysql/mysqlConnection'

const getAuthedUser = (resolve, reject) => {
  fetch({
    url: '/user'
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
}

export default {
  getAuthedUser,
}
