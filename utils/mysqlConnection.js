import mysql from 'mysql'
import chalk from 'chalk'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sjf978977',
  database: 'sljCi'
})

export default connection
