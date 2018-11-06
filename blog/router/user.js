const express = require('express')
const router = express.Router()
const conSql = require('../controller/userCon.js')

//分发路由
//模板渲染注册页面
router.get('/register', conSql.showRegisterPage)

//模板渲染登陆页面
router.get('/login', conSql.showLoginPage)

//注册api
router.post('/register', conSql.reg)

// 登陆api
router.post('/login', conSql.login)

router.get('/logout', conSql.logout)
//收集文章信息
router.post('/article', conSql.article)

// 跳转到详情页
router.post('/article/info/:id', conSql.info)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
module.exports = router