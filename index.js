const http = require('http');
const path = require('path')
const router = require('./helper/router.js')
const openUrl=require('./helper/openUrl.js')


class Server {
    constructor(conf) {
        this.conf = conf;
    }
    start() {
        const server = http.createServer((req, res) => {
            if (req.url == '/favicon.ico') {
                return;
            }

            const filePath = path.join(this.conf.baseUrl, req.url)
            router(req, res, filePath,this.conf)
        })

        server.listen(this.conf.port, this.conf.hostName, () => {
            console.log(`服务器地址是http://${this.conf.hostName}:${this.conf.port}`);
            if(this.conf.open){
                openUrl(`http://${this.conf.hostName}:${this.conf.port}`)
            }
        })
    }
}

module.exports=Server