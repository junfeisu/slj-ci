import connection from './mysqlConnection'

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject({status: 0, err: err})
        return
      }

      resolve({status: 1, data: result})
    })
  })
}

export default query
