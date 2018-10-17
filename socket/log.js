import io from './io'
import query from '../utils/mysql/query'

const logRoom = io.of('/log')
  .on('connection', socket => {
    let socketId = socket.id.split('#')[1]

    socket.on('build', async data => {
      try {
        const { userId, historyId } = data
        const addNoticeSql = 'insert into notice (room, user_id, history_id, socket_id) values (?, ?, ?, ?)'
        const addNoticeParams = ['log', userId, historyId, socketId]

        await query(addNoticeSql, addNoticeParams)
      } catch (err) {
        console.log('add log notice err', err.message)
      }
    })

    socket.on('disconnect', async () => {
      try {
        const removeNoticeSql = 'delete from notice where room = "log" and socket_id = ?'
        const removeNoticeParams = [socketId]

        await query(removeNoticeSql, removeNoticeParams)
      } catch (err) {
        console.log('remove log notice err', err.message)
      }
    })
  })

const sendLog = async (eventName, data = null, historyId = null) => {
  if (!historyId) {
    logRoom.emit(eventName, data)
    return
  }

  const searchSocketSql = 'select socket_id from notice where room = "log" and history_id = ?'
  const searchResult = await query(searchSocketSql, historyId)

  if (searchResult.length) {
    searchResult.forEach(val => {
      io.to(val.socket_id).emit('updateLog', data)
    })
  }
}

export { sendLog }

export default logRoom
