const {createDeflate,createGzip} = require('zlib')

// 开启压缩文件
module.exports=function(rs,req,res){
    const acceptEncoding=req.headers['accept-encoding']
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs
    }else if(acceptEncoding.match(/\bgzip\b/)){ //判断浏览器是否支持这种压缩格式
        // 设置响应头，告诉浏览器用这种方式解压
        res.setHeader('Content-Encoding','gzip')
        return rs.pipe(createGzip())
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate')
        return rs.pipe(createDeflate())
    }
}