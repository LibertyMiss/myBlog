const conn = require('../db/db.js')
const marked = require('marked')
module.exports = {
    article: (req, res) => {
        if (!req.session.isLogin) {
            return res.redirect('/')
        }
        res.render('./user/article.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },
    info: (req, res) => {
        const id = req.params.id
        // console.log(id);

        const queryId = "select * from text where id = ?"
        conn.query(queryId, id, (err, result) => {
            // console.log(result);

            const renderObj = {
                user: req.session.user,
                isLogin: req.session.isLogin
            }
            if (err || result.length != 1) {
                return res.send({
                    status: 404,
                    msg: '查询失败'
                });
            }
            // 如果找到文章就将文章转换为HTML标签
            result[0].content = marked(result[0].content)
            // 将文章对象加到renderObj中
            renderObj.article = result[0]
            // console.log(renderObj.article);

            // 渲染文章详情页面
            res.render('./article/info.ejs', renderObj)
        })
    },
    edit: (req, res) => {
        if (!req.session.isLogin) {
            return res.redirect('/')
        }
        const id = req.params.id
        const editSql = `select * from text where id = ${id}`
        conn.query(editSql, (err, result) => {
            console.log(result);
            if (err) {
                return res.send({
                    status: 500,
                    msg: '查询失败'
                })
            }
            res.render('./article/edit.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0]
            })
        })
    },
    editPost: (req, res) => {
        const body = req.body
        console.log(body)
        const editSql = `update text set ? where id = ?`
        conn.query(editSql, [body, body.id],(err,result) => {
            if(err) {
                return res.send({
                    status:500,
                    msg:'数据插入失败'
                })
            }
            res.send({
                status:200,
                msg:'数据插入成功',
                articleId: body.id
            })
        })
    }
}