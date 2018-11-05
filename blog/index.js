const express = require('express')
const app = express()
const ejs = require('ejs')

//设置模板引擎名称
app.set('view engine','ejs')
//设置模板目录
app.set('views','./views')

// 托管静态资源
app.use('/node_modules',express.static('./node_modules'))
// app.use('node_modules', express.static('./node_modules'))

//res.render第一个参数是路径,相对于views文件夹
app.get('/',(req,res) => {
    res.render('./index.ejs',{})
})
app.listen(80,() => {
    console.log('输入http://127.0.0.1:80 访问');
})