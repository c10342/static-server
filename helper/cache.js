const {cache} = require('../config/config.js')

function refreshRes(stats,res){
    const {maxAge,expires,etag,lastModified,cacheControl}=cache;
    if(expires){
        // 设置过期时间
        res.setHeader('Expires',(new Date(Date.now()+maxAge)).toUTCString())
    }
    if(cacheControl){
        // 设置缓存过期时间，相对时间
        res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
    }
    if(lastModified){
        // 文件最后修改的时间
        // res.setHeader('Last-Modified',stats.mtime.toUTCString())  
        
    }
    if(etag){
        // 设置标志，一般用文件的打包的哈希值
        // res.setHeader('ETag',`${stats.size}-${stats.mtime}`)
    }
}

module.exports=function(stats,req,res){
    refreshRes(stats,res)
    // 获取浏览器上次获取资源时资源修改的时间
    const lastModified=req.headers['if-modified-since']
    const etag=req.headers['if-none-match']

    if(!lastModified && !etag){
        return false;
    }
    // 不一样说明文件失效
    if(lastModified!=res.getHeader('Last-Modified') && lastModified){
        return false;
    }

    if(etag && etag!=res.getHeader('ETag')){
        return false
    }
    return true
}