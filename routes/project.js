import Joi from 'joi'
import getBoomErrWay from '../utils/request/errorTable'
import query from '../utils/mysql/query'

const addProject = {
  path: '/project/add',
  method: 'POST',
  options: {
    validate: {
      payload: {
        projectName: Joi.string().min(1).max(20).required(),
        repository: Joi.object().required(),
        user_id: Joi.number().integer().min(1).required()
      }
    },
    handler: async (req, h) => {
      try {
        const { projectName, user_id, repository } = req.payload
        const { id, name, type, ownerId, ownerName, ownerAvatar, sshUrl, isPrivate } = repository
        const sql = 'insert into project (name, repository_id, repository_type, user_id) values (?, ?, ?, ?);'
        const insertRepository = 'insert into repository (id, name, type, owner_id, owner_name, '
          + 'owner_avatar, ssh_url, private) values (?, ?, ?, ?, ?, ?, ?, ?)'
        const repositoryParams = [id, name, type, ownerId, ownerName, ownerAvatar, sshUrl, isPrivate]
        const params = [projectName, id, type, user_id]
        const searchRepository = 'select * from repository where type=? and id=?'
        const searchParams = [type, id]

        const searchRepositoryResult = await query(searchRepository, searchParams)

        if (!searchRepositoryResult.length) {
          await query(insertRepository, repositoryParams)
        }

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
        const sql = {
          sql: 'select * from project left join repository on project.repository_type=repository.type'
            + ' and project.repository_id=repository.id where project.user_id = ?',
          nestTables: true
        }
        const params = [userId]
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
