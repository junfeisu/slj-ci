import Joi from 'joi'
import getBoomErrWay from '../utils/request/errorTable'
import query from '../utils/mysql/query'

const addHistory = {
  path: '/history/add',
  method: 'PUT',
  options: {
    validate: {
      payload: {
        project_id: Joi.number().integer().min(1).required(),
        trigger_user_name: Joi.string().required(),
        trigger_way: Joi.string().required(),
        branch: Joi.string().required(),
        commit_id: Joi.string().length(7).required(),
        commit_message: Joi.string().required()
      }
    },
    handler: async (req, h) => {
      try {
        const { project_id, trigger_user_name, trigger_way, branch, commit_id, commit_message } = req.payload
        const addHistorySql = 'insert into history (project_id, trigger_user_name, trigger_way,'
          + ' branch, commit_id, commit_message) values (? ,?, ?, ?, ?, ?)'
        const addHistoryParams = [project_id, trigger_user_name, trigger_way, branch, commit_id, commit_message]

        const result = await query(addHistorySql, addHistoryParams)

        return {status: 1, data: {id: result.insertId}}
      } catch (err) {
        return getBoomErrWay(400)(err.message)
      }
    }
  }
}

const updateHistory = {
  path: '/history/update/{historyId}',
  method: 'POST',
  options: {
    validate: {
      params: {
        historyId: Joi.number().min(1).required()
      },
      payload: {
        end_time: Joi.string().required(),
        status: Joi.number().required()
      }
    },
    handler: async (req, h) => {
      try {
        const { historyId } = req.params
        const { status, end_time } = req.payload
        const updateHistorySql = 'update history set end_time = ? and status = ? where id = ?'
        const updateHistoryParams = [end_time, status, historyId]

        const updateResult = await query(updateHistorySql, updateHistoryParams)

        return updateResult.affectedRows > 0 ? {status: 1, data: null} : {status: 0, data: updateResult.message}
      } catch (err) {
        return getBoomErrWay(400)(err.message)
      }
    }
  }
}

const getHistories = {
  path: '/history/list/{project_id}',
  method: 'GET',
  options: {
    validate: {
      query: {
        page_num: Joi.number().min(1),
        page_size: Joi.number().min(1)
      },
      params: {
        project_id: Joi.number().integer().min(1).required()
      }
    },
    handler: async (req, h) => {
      try {
        let { page_num, page_size } = req.query
        let total = 0
        const { project_id } = req.params

        page_num = page_num ? page_num : 1
        page_size = page_size ? page_size : 10

        const getHistoriesSql = 'select *, (select count(*) from history where project_id=?) as total from history where project_id = ? limit ?,?'
        const getHistoriesParams = [project_id, project_id, (page_num - 1) * page_size, page_size]

        const result = await query(getHistoriesSql, getHistoriesParams)

        result.map((val, index) => {
          if (index === 0) {
            total = val.total
          }

          delete val.total
        })

        return {status: 1, data: {histories: result, total: total}}
      } catch (err) {
        console.log(err)
        return getBoomErrWay(400)(err.message)
      }
    }
  }
}

const deleteHistory = {
  path: '/history/remove/{history_id}',
  method: 'DELETE',
  options: {
    validate: {
      params: {
        history_id: Joi.number().integer().min(1).required()
      }
    },
    handler: async (req, h) => {
      try {
        const { history_id } = req.params
        const deleteHistorySql = 'delete from history where id = ?'
        const deleteHistoryParams = [history_id]

        const result = await query(deleteHistorySql, deleteHistoryParams)

        return result.affectedRows === 1 ? {status: 1, data: null} : {status: 0, data: result.message}
      } catch (err) {

      }
    }
  }
}

export default [
  addHistory,
  updateHistory,
  getHistories,
  deleteHistory
]
