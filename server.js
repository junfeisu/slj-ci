import Hapi from 'hapi'

export const serverConf = {
  port: process.env.PORT || 8000,
  host: 'localhost',
  routes: {
    cors: true
  }
}

export default Hapi.server(serverConf)
