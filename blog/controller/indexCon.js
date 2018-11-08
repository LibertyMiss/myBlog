const conn = require('../db/db.js')
module.exports = {
    //登陆成功之后,session会有用户属性
    showIndex: (req, res) => {
        // 设置每一页显示的条数
        let pageSize = 5
        // 显示的当前页数
        let currentPage = parseInt(req.query.page) || 1

        const querySql = `select t.id, t.title, t.ctime, u.nickname, u.username from text as t
                left join users as u
                on t.author_id = u.id
                order by t.id desc
                limit ${(currentPage - 1) * pageSize}, ${pageSize};
                select count(*) as count from text;`

        conn.query(querySql,(err,result) => {
            if(err) {
                return res.send({
                    status:500,
                    msg:'渲染失败'
                })
            }
            if (!result) result = [[]]
            let totalCount = result[1][0].count
            let totalPage = Math.ceil(totalCount / pageSize)
            // console.log(currentPage)
            res.render('./index.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0],
                totalPage: totalPage,
                currentPage: currentPage
            })
        })
    }

}