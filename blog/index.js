const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const moment = require('moment')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my-blog',
});

//设置模板引擎名称
app.set('view engine', 'ejs')
//设置模板目录
app.set('views', './views')

// 托管静态资源
app.use('/node_modules', express.static('./node_modules'))
// app.use('node_modules', express.static('./node_modules'))

// 注册body-parser中间件,注册之后才能使用
app.use(bodyParser.urlencoded({
    extended: false
}))
//res.render第一个参数是路径,相对于views文件夹
app.get('/', (req, res) => {
    res.render('./index.ejs', {})
})

//模板渲染注册页面
app.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

//模板渲染登陆页面
app.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})

//注册api
app.post('/register', (req, res) => {
    const body = req.body
    console.log(body);
    if ((body.username.trim().length == 0) || (body.password.trim().length == 0) || (body.password.trim().length == 0)) {
        return res.send({
            status: 400,
            msg: '请输入完整的用户信息',
        })
    }

    //查重,执行sql语句 提交过来的用户名是否存在
    const sql1 = "select count(*) as count from users where username = ?"
    conn.query(sql1,body, (err, res) => {
        if (err) {
                res.send({
                status: 500,
                msg: '查询失败'
            })
        }
        // if (result[0].count != 0) {
        //      res.send({
        //         status: 304,
        //         msg: '用户名已存在,请重试'
        //     })
        // }
        
        // 创建时间
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')

        // 将处理后的数据加入数据库
        const addsql = 'insert into users set ?'
        // conn.query(addsql,body, (err, res) => {
        //     if (err || res.affectedRows != 1) {
        //         return res.send({
        //             status:500,
        //             msg:'插入失败'
        //         })
        //     }
        //     // if(res.affectedRows != 1){
        //     //     res.send({
        //     //         status: 404,
        //     //         msg: "插入失败"
        //     //     })
        //     // }
        //     res.send({
        //         status: 200,
        //         msg: "插入成功"
        //     })
        // })
    })
    res.send({
        status: 200,
        msg: 'ok',
    })
})

// 登陆api
app.post('/login',(req,res) => {
    const body = res.body
    console.log(body);
    const loginSql = "select * from users where username = ? and password = ?"
    conn.query(loginSql,body,(err,res) => {
        
    })
    res.send({
        status:200,
        msg:'成功'
    })
})

app.listen(80, () => {
    console.log('输入http://127.0.0.1:80 访问');
})