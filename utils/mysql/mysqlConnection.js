import mysql from 'mysql'
import chalk from 'chalk'
import mysqlConf from '../../config/mysqlConf.json'

const connection = mysql.createConnection(mysqlConf)

connection.connect()

export default connection
