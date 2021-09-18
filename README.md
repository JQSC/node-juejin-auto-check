# node服务端自动签到掘金脚本

## 使用步骤

### 1、修改config.js内cookie

[如何从浏览器获取cookie](https://jingyan.baidu.com/article/aa6a2c14b84ad80d4c19c482.html)

### 2、安装pm2
```shell
npm install -g pm2
```

### 3、使用pm2启动项目

```shell
pm2 start index.js --name ***
```
