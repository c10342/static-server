const mimeType={
    ".htm":"text/html",
    ".png":"image/png", 
    ".json":"application/json",
    ".js":"application/javascript"
}

exports.getMimeType=function(ext){
    const type=mimeType[ext]
    if(!type){
        return 'text/plain;charset=utf8'
    }
    return `${type};charset=utf8`
}