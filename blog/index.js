const express = require('express')
const app = express()
const bodyParser = require('body-parser')


//设置模板引擎名称
app.set('view engine', 'ejs')
//设置模板目录
app.set('views', './views')

// 托管静态资源
app.use('/node_modules', express.static('./node_modules'))

// 注册body-parser中间件,注册之后才能使用
app.use(bodyParser.urlencoded({
    extended: false
}))
// 导入首页的路由模块
const indexRouter = require('./router/index.js')
app.use(indexRouter)

// 导入用户功能的路由模块
const userRouter = require('./router/user.js')
app.use(userRouter)

app.listen(80, () => {
    console.log('输入http://127.0.0.1:80 访问');
})