module.exports={
    port:3000,
    hostName:'127.0.0.1',
    baseUrl:process.cwd(),//启动node的路径
    compress:/\.(html|css|js|json)/, //需要压缩的的文件
    cache:{ //缓存相关
        maxAge:600,  //缓存最大时间，单位秒
        // 需要开启的缓存方式
        expires:true, 
        cacheControl:true,
        lastModified:true,
        etag:true
    }
}