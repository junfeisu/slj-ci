const createTables = (connection) => {
  const createUserTable = 'create table if not exists user ('
    + 'id int unsigned NOT NULL AUTO_INCREMENT,'
    + 'username varchar(20),'
    + 'password varchar(40),'
    + 'github_id int unsigned,'
    + 'gitlab_id int unsigned,'
    + 'PRIMARY KEY(id),'
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
    + 'username varchar(20) NOT NULL,'
    + 'name varchar(20) NOT NULL,'
    + 'avatar_url varchar(100) NOT NULL,'
    + 'email varchar(40),'
    + 'access_token varchar(100),'
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
    + 'access_token varchar(100),'
    + 'PRIMARY KEY(id)'
    + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

  connection.query(createGitlabTable, (err, result) => {
    if (err) {
      console.log('create table gitlab err ', err)
      return
    }

    console.log('create table gitlab success')
  })

  const createProjectTable = 'create table if not exists project ('
    + 'id int unsigned NOT NULL AUTO_INCREMENT,'
    + 'name varchar(20) NOT NULL,'
    + 'repository_id int unsigned NOT NULL,'
    + 'repository_type varchar(20) NOT NULL,'
    + 'user_id int unsigned,'
    + 'PRIMARY KEY(id),'
    + 'CONSTRAINT project_user FOREIGN KEY(user_id) REFERENCES user(id),'
    + 'UNIQUE (name)'
    + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

  connection.query(createProjectTable, (err, result) => {
    if (err) {
      console.log('create table project err ', err)
      return
    }

    console.log('create table project success')
  })

  const createHistoryTable = 'create table if not exists history ('
    + 'id int unsigned NOT NULL AUTO_INCREMENT,'
    + 'create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,'
    + 'end_time timestamp DEFAULT CURRENT_TIMESTAMP,'
    + 'project_id int unsigned,'
    + 'trigger_user_name varchar(20) NOT NULL,'
    + 'trigger_way varchar(10) NOT NULL,'
    + 'branch varchar(20) NOT NULL,'
    + 'commit_id varchar(10) NOT NULL,'
    + 'commit_message varchar(50),'
    + 'status tinyint(1) DEFAULT NULL,'
    + 'CONSTRAINT project_history FOREIGN KEY(project_id) REFERENCES project(id) on delete cascade on update cascade,'
    + 'PRIMARY KEY(id)'
    + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

  connection.query(createHistoryTable, (err, result) => {
    if (err) {
      console.log('create table history err ', err)
      return
    }

    console.log('create table history success')
  })

  const createNoticeTable = 'create table if not exists notice ('
    + 'room varchar(20) NOT NULL,'
    + 'user_id int unsigned,'
    + 'project_id int unsigned,'
    + 'socket_id varchar(50) NOT NULL,'
    + 'PRIMARY KEY(room,socket_id)'
    + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

  connection.query(createNoticeTable, (err, result) => {
    if (err) {
      console.log('create table notice err ', err)
      return
    }

    console.log('create table notice success')
  })

  const createRepositoryTable = 'create table if not exists repository ('
    + 'id int unsigned NOT NULL,'
    + 'name varchar(20) NOT NULL,'
    + 'type varchar(20) NOT NULL,'
    + 'owner_id int unsigned NOT NULL,'
    + 'owner_name varchar(20) NOT NULL,'
    + 'owner_avatar varchar(100) NOT NULL,'
    + 'ssh_url varchar(100) NOT NULL,'
    + 'private tinyint(1) DEFAULT 0,'
    + 'PRIMARY KEY(id,type)'
    + ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

  connection.query(createRepositoryTable, (err, result) => {
    if (err) {
      console.log('create table repository err ', err)
      process.exit(1)
    }

    console.log('create table repository success')
    process.exit()
  })
}

module.exports = createTables
