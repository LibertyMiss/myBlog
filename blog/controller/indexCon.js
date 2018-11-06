
module.exports = {
    //登陆成功之后,session会有用户属性
    showIndex:(req, res) => {
        res.render('./index.ejs', {
            user:req.session.user,
            isLogin:req.session.isLogin
        })
    }
}
