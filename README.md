# noteBackend
使用 Node.js + Express + MySQL 搭建的后端增删改查接口程序  


## 开始使用  

### 安装依赖  

clone 这个项目到本地
```
git clone https://github.com/skylinebin/noteBackend.git
```

在命令行该项目目录下，使用 npm 安装 依赖开发包  

```
npm install
```

### 修改数据库配置

修改 config.js 下的数据库配置为自己数据库配置
```
    mysqlHost: '127.0.0.1',
    mysqlPort: '3306',
    mysqlUser: 'databaseUsername',
    mysqlPass: 'databasePassword',
    mysqlDb: 'databaseName'
```

### 导入数据库表

向 MySQL 数据库中 导入 本项目根目录下的 note.sql 文件创建 note 表，数据库请与配置项中保持一致。
> 例如，创建 名为 mynote 的数据库，向 mynote 数据库中导入 note.mysql 文件 会创建 note 表，config.js 配置项中 mysqlDb 应修改为 'mynote'  



### 启动该项目  

```
node index.js
```

或者 安装 pm2, 使用 pm2 启动项目
```
npm install -g pm2
pm2 start index.js
```

### 测试接口  
启动项目后，在浏览器请求 以下接口用于测试：  
```
http://localhost:8888/getnotelist
```
以上为获取所有 note 数据  

```
http://localhost:8888/addonenote?note=Note&backup=tester&time=2019-04-30+09:17:18
```
添加一条记录

### 其他  
public 目录本应用于存放前端资源文件，目前文件为 Webpack 项目打包文件不可直接编辑，只提供了 请求 和添加的接口实现
正常启动项目后，访问
```
http://localhost:8888/
```
即可查看