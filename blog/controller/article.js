module.exports = {
    article:(req,res) => {
        if(!req.session.isLogin){
             return res.redirect('/')
        }
       res.render('../views/user/article.ejs',{
            user:req.session.user,
            isLogin:req.session.isLogin
       }) 
    }
}