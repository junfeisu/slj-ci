import connection from './mysqlConnection'

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject(err)
        return
      }

      resolve(result)
    })
  })
}

export default query
