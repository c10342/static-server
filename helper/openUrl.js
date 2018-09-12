const { exec } = require('child_process')

// 用浏览器打开默认的地址
module.exports = function (url) {
    switch (process.platform) {
        case 'darwin':
            exec(`open ${url}`)
            break;

        case 'win32':
            exec(`start ${url}`)
            break;
    }
}