const mysqlConf = require('../config/mysqlConf.json')
const mysql = require('mysql')

const { user, password, host } = mysqlConf

const connection = mysql.createConnection({
  host,
  user,
  password
})

const createDb = 'create database if not exists sljCi;'

connection.query(createDb, (err, result) => {
  if (err) {
    console.log('err', err)
    process.exit(1)
  }

  console.log('create database success')
  process.exit(0)
})
