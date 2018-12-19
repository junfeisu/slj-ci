## Slj-Ci

> A lightweight ci system which supports github and gitlab.

### 数据库及github | gitlab配置文件

因为私密性以及安全性的问题，这些配置文件就没有提交上github.需要用户自己手动添加

* mysql配置文件

    在项目根目录创建一个config文件夹(如果不存在)，向里面添加一个mysqlConf.json文件，内容格式如下，具体内容自己替换：

    ```json
    {
      "host": "localhost",
      "user": "username",
      "password": "you password",
      "database": "your database name"
    }
    ```

* github | gitlab配置文件

    在项目根目录创建一个config文件夹(如果不存在)，向里面添加githubConf.json，gitlabConf.json，内容格式如下，具体内容自己替换：
    
    ```json
    {
      "appInfo": {
        "client_id": "xxxxxxxxxxxx",
        "client_secret": "xxxxxxxxxxxxx"
      }
    }
    ```

### ci思路

1. push dev、feature 代码到仓库 | 手动触发（指定分支，指定commit）

2. webhook响应发送一个post请求给服务端 | 发送请求

3. git clone ssh_url && git checkout branchName | commit_id

4. create container by base image

5. run scripts(test script) in container

6. run build: CMD script execute

7. clear

从第3-6步，及时更新status, log(socket), 并保存日志