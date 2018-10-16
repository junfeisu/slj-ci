import io from './io'
import query from '../utils/mysql/query'

const logRoom = io.of('/log')
  .on('connection', socket => {
    let socketId = socket.id.split('#')[1]

    socket.on('build', async data => {
      try {
        const { userId, projectId } = data
        const addNoticeSql = 'insert into notice (room, user_id, project_id, socket_id) values (?, ?, ?, ?)'
        const addNoticeParams = ['log', userId, projectId, socketId]

        await query(addNoticeSql, addNoticeParams)
      } catch (err) {
        console.log('add notice err', err.message)
      }
    })

    socket.on('disconnect', async () => {
      try {
        const removeNoticeSql = 'delete from notice where socket_id = ?'
        const removeNoticeParams = [socketId]

        await query(removeNoticeSql, removeNoticeParams)
      } catch (err) {
        console.log('remove notice err', err.message)
      }
    })
  })

export default logRoom
