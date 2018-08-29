const connection = require('../utils/mysql/mysqlConnection').default

const createUserTable = 'create table if not exists user ('
  + 'user_id int unsigned NOT NULL AUTO_INCREMENT,'
  + 'username varchar(20) NOT NULL,'
  + 'password varchar(40) NOT NULL,'
  + 'access_token varchar(40),'
  + 'auth int unsigned NOT NULL,'
  + 'PRIMARY KEY(user_id)'
  + ')ENGINE=InnoDB DEFAULT ChARSET=utf8;'

connection.query(createUserTable, (err, result) => {
  if (err) {
    console.log('create user table err ', err)
    return
  }

  console.log('create user table success')
})

const createAuthTable = 'create table if not exists auth ('
  + 'auth_id int unsigned NOT NULL AUTO_INCREMENT,'
  + 'type varchar(20) NOT NULL,'
  + 'authed tinyint(1) DEFAULT 0,'
  + 'create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,'
  + 'update_date timestamp DEFAULT now() ON UPDATE now(),'
  + 'PRIMARY KEY(auth_id)'
  + ')ENGINE=InnoDB DEFAULT ChARSET=utf8;'

connection.query(createAuthTable, (err, result) => {
  if (err) {
    console.log('create auth table err ', err)
    process.exit(1)
  }

  console.log('create auth table success')
  process.exit(0)
})
