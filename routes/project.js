import Joi from 'joi'
import getBoomErrWay from '../utils/request/errorTable'
import query from '../utils/mysql/query'

const addProject = {
  path: '/project/add',
  method: 'POST',
  options: {
    validate: {
      payload: {
        name: Joi.string().min(1).max(20).required(),
        repository_id: Joi.number().integer().min(1).required(),
        repository_type: Joi.string().regex(/^git(hub|lab)$/).required(),
        user_id: Joi.number().integer().min(1).required()
      }
    },
    handler: async (req, h) => {
      try {
        const { name, user_id, repository_id, repository_type } = req.payload
        const sql = 'insert into project (name, repository_id, repository_type, user_id) values (?, ?, ?, ?);'
        const params = [name, repository_id, repository_type, user_id]

        const result = await query(sql, params)

        return {status: 1, data: {id: result.insertId}}
      } catch (err) {
        return getBoomErrWay(400)(err.message)
      }
    }
  }
}

const getProjects = {
  path: '/projects/{userId}/{type}',
  method: 'GET',
  options: {
    validate: {
      params: {
        userId: Joi.number().integer().min(1).required(),
        type: Joi.string().min(1).required()
      }
    },
    handler: async (req, h) => {
      try {
        const { userId, type } = req.params
        const sql = 'select * from project where user_id = ? and repository_type = ?'
        const params = [userId, type]
        const projects = await query(sql, params)

        return {status: 1, data: projects}
      } catch (err) {
        return getBoomErrWay(400)(err.message)
      }
    }
  }
}

const getSingleProject = {
  path: '/project/{projectId}',
  method: 'GET',
  options: {
    validate: {
      params: {
        projectId: Joi.number().integer().min(1).required()
      }
    },
    handler: async (req, h) => {
      try {
        const sql = 'select * from project where id = ?'
        const params = [req.params.projectId]

        const projects = await query(sql, params)

        return projects.length ? {status: 1, data: ''} : {status: 1, data: projects[0]}
      } catch (err) {
        return getBoomErrWay(400)(err.message)
      }
    }
  }
}

export default [
  addProject,
  getProjects,
  getSingleProject,
]
