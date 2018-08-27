import Boom from 'boom'

const boomErrTable = {
  400: Boom.badRequest,
  401: Boom.unauthorized,
  402: Boom.paymentRequired,
  403: Boom.forbidden,
  404: Boom.notFound,
  405: Boom.methodNotAllowed,
  406: Boom.notAcceptable,
  407: Boom.proxyAuthRequired,
  408: Boom.clientTimeout,
  409: Boom.conflict,
  410: Boom.resourceGone,
  411: Boom.lengthRequired,
  412: Boom.preconditionFailed,
  413: Boom.entityTooLarge,
  414: Boom.uriTooLong,
  415: Boom.unsupportedMediaType,
  416: Boom.rangeNotSatisfiable,
  417: Boom.expectationFailed,
  418: Boom.teapot,
  422: Boom.badData,
  423: Boom.locked,
  424: Boom.failedDependency,
  428: Boom.preconditionRequired,
  429: Boom.tooManyRequests,
  451: Boom.illegal,
  500: Boom.badImplementation,
  501: Boom.notImplemented,
  502: Boom.badGateway,
  503: Boom.serverUnavailable,
  504: Boom.gatewayTimeout
}

const getBoomErrWay = (errCode) => {
  const boomErrWay = boomErrTable[errCode]

  return boomErrWay ? boomErrWay : Boom.badImplementation
}

export default getBoomErrWay
