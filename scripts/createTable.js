const connection = require('../utils/mysql/mysqlConnection').default

const createUserTable = 'create table if not exists user ('
  + 'user_id int unsigned NOT NULL AUTO_INCREMENT,'
  + 'username varchar(20) NOT NULL,'
  + 'password varchar(40) NOT NULL,'
  + 'github_token varchar(40),'
  + 'github_authed tinyint NOT NULL DEFAULT 0,'
  + 'PRIMARY KEY(user_id)'
  + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

connection.query(createUserTable, (err, result) => {
  if (err) {
    console.log('create user table err ', err)
    return
  }

  console.log('create user table success')
  process.exit(0)
})
