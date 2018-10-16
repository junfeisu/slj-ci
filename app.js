import server from './server'
import routes from './routes'
import initSocket from './socket/index'

async function start () {
  try {
    // await server.register(require('./plugins/socket').default)
    await server.register(require('./plugins/interceptor').default)

    initSocket()

    server.realm.modifiers.route.prefix = '/api'
    routes.forEach(route => {
      server.route(route)
    })

    await server.start()
    console.log('server is start at ' + server.info.uri)
  } catch (err) {
    console.log('start server err is ', err)
    throw err
  }
}

process.on('unhandledRejection', err => {
  console.log('unhandle rejection is ', err.message)
  process.exit(1)
})

start()
