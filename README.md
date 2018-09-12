# staticResourceService

> 静态资源服务

## Build Setup

``` bash
# 全局安装
npm install staticResourceService -g

#启动命令
staticResourceService -p 9000 -h 127.0.0.1 -d ./  -o true
或者
staticResourceService --port=9000 --hostName=127.0.0.1 --baseUrl=./ --open=true

#参数说明
-p或者是--port是端口号，默认是3000
-h或者是--hostName是主机名，默认是127.0.0.1
-d或者是--baseUrl是项目的路径，默认是当前启动node的路径为根路径
-o或者是--open是自动打开浏览器，默认是false
```
