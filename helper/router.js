const fs = require('fs')
const { promisify } = require('util')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const ejs = require('ejs')
const path = require('path')
const type = require('./mime.js')
const compress = require('./compress.js')
const isFresh=require('./cache.js')

module.exports = async function (req, res, filePath,conf) {
    try {
        const stats = await stat(filePath)
        if(isFresh(stats,req,res)){
            res.statusCode=304;
            return;
        }
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', type.getMimeType(path.extname(filePath)));
            // 创建一个可读的流，并把读出来的内容通过管道流向res中
            // fs.createReadStream(filePath).pipe(res);
            let rs = fs.createReadStream(filePath);
            if (filePath.match(conf.compress)) {
                rs = compress(fs.createReadStream(filePath), req, res)
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html;charset=utf8');
            const data = {
                title: path.basename(filePath),
                files,
                filePath: path.relative(conf.baseUrl, filePath)
            }
            // 找出filePath在conf.baseUrl下的相对路径    
            // console.log(path.relative(conf.baseUrl,filePath));

            ejs.renderFile(path.join(__dirname, '../template/temp.html'), data, function (err, str) {
                res.end(str)
            });
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain;charset=utf8');
        res.end(`${filePath} is not exits`)
    }
}