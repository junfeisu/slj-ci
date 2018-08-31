import getBoomErrWay from './errorTable'

const errorHanlder = (reject, err) => {
  const { response } = err

  if (!response) {
    reject(getBoomErrWay('401')('auth failed'))
    return
  }

  reject(getBoomErrWay(response.status)(response.data.message))
}

export default errorHanlder
