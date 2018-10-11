## Slj-Ci

> A lightweight ci system which supports github and gitlab.

### structure
![项目思路图](http://www.sujunfei.cn/structure.png)

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
