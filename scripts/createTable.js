const connection = require('../utils/mysql/mysqlConnection').default

const createUserTable = 'create table if not exists user ('
  + 'user_id int unsigned NOT NULL AUTO_INCREMENT,'
  + 'username varchar(20) NOT NULL,'
  + 'password varchar(40) NOT NULL,'
  + 'PRIMARY KEY(user_id),'
  + 'UNIQUE KEY(username)'
  + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

connection.query(createUserTable, (err, result) => {
  if (err) {
    console.log('create user table err ', err)
    return
  }

  console.log('create user table success')
})

const createGithubTable = 'create table if not exists github ('
  + 'id int unsigned NOT NULL,'
  + 'login varchar(20) NOT NULL,'
  + 'name varchar(20) NOT NULL,'
  + 'avatar_url varchar(100) NOT NULL,'
  + 'email varchar(40),'
  + 'user int unsigned,'
  + 'PRIMARY KEY(id)'
  + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

connection.query(createGithubTable, (err, result) => {
  if (err) {
    console.log('create github table err', err)
    return
  }

  console.log('create github table success')
})

const createGitlabTable = 'create table if not exists gitlab ('
  + 'id int unsigned NOT NULL,'
  + 'username varchar(20) NOT NULL,'
  + 'name varchar(20) NOT NULL,'
  + 'avatar_url varchar(100) NOT NULL,'
  + 'email varchar(40),'
  + 'user int unsigned,'
  + 'PRIMARY KEY(id)'
  + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

connection.query(createGitlabTable, (err, result) => {
  if (err) {
    console.log('create table gitlab err ', err)
    process.exit(0)
  }

  console.log('create table gitlab success')
  process.exit(1)
})