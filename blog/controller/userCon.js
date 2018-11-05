const moment = require('moment')
const conn = require('../db/db.js')

module.exports = {
    showRegisterPage: (req, res) => {
        res.render('./user/register.ejs', {})
    },
    showLoginPage: (req, res) => {
        res.render('./user/login.ejs', {})
    },
    reg: (req, res) => {
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
        conn.query(sql1, body.username, (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    msg: '查询失败'
                })
            }
            if (result[0].count != 0) {
                return res.send({
                    status: 304,
                    msg: '用户名已存在,请重试'
                })
            }

            // 创建时间
            body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
            console.log(body);

            // 将处理后的数据加入数据库
            const addsql = 'insert into users set ?'
            conn.query(addsql, body, (err, result) => {
                // console.log(result);
                if (err || result.affectedRows !== 1) {
                    return res.send({
                        status: 500,
                        msg: '插入失败'
                    })
                }
                res.send({
                    status: 200,
                    msg: 'ok',
                })
            })

        })

    },
    login: (req, res) => {
        const body = req.body
        console.log(body);
        const loginSql = "select * from users where username = ? and password = ?"
        conn.query(loginSql, [body.username, body.password], (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    msg: '登陆失败'
                })
            }
            console.log(result);
            // 判断是否匹配成功,有没有返回数据
            if (result.length != 1) {
                return res.send({
                    status: 400,
                    msg: "登录失败"
                })
            }
            res.send({
                status: 200,
                msg: '成功'
            })
        })
    },
}