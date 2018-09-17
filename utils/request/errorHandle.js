import getBoomErrWay from './errorTable'

const errorHanlder = (reject, err) => {
  const { response } = err

  if (!response) {
    return getBoomErrWay('401')('auth failed')
  }

  return getBoomErrWay(response.status)(response.data.message)
}

export default errorHanlder
