import server from './server'
import createWebhook from './utils/createWebhook'
import createToken from './utils/createToken'

// createWebhook()
createToken()

async function start () {
  try {
    await server.register({
      plugin: require('./socket/index'),
      options: {}
    })
    await server.start()
  } catch (err) {
    console.log('start server err is ', err)
    throw err
  }

  console.log('server is start at ' + server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log('unhandle rejection is ', err.message)
  process.exit(1)
})

start()
