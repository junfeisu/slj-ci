import jsonWebToken from 'jsonwebtoken'

const secret = 'slj160214'

const generateToken = (userId, expire = '2d') => {
  let token = jsonWebToken.sign({
    name: userId,
  }, secret, {
    expiresIn: expire
  })

  return token
}

const verifyToken = (token, userId) => {
  let result = {
    isValid: true,
    message: ''
  }

  try {
    let decodedToken = jsonWebToken.verify(token, secret)
    if (decodedToken.name === Number(userId)) {
      return result
    }
  } catch (err) {
    result.isValid = false
    result.message = err.message

    return result
  }
}

export default {
  generateToken,
  verifyToken
}
