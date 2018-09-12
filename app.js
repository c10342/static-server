const yargs=require('yargs')
const conf = require('./config/config.js');
const Server=require('./index.js')


// 获取命令行输入的参数  node -p 8000 ==>node --port=8000
const argv=yargs.usage('staticServer [options]')
.option('p',{
    alias:'port',
    describe:'端口号',
    default:'3000'
}).option('h',{
    alias:'hostName',
    describe:'主机名',
    default:'127.0.0.1'
}).option('d',{
    alias:'baseUrl',
    describe:'启动node的路径',
    default:process.cwd()
}).option('o',{
    alias:'open',
    describe:'打开浏览器',
    default:false
}).version()
.alias('v','version')
.help() //输入--help是可查看所有命令
.argv;

const config=Object.assign({},conf,argv)

const server=new Server(config)

server.start();