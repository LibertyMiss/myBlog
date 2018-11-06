const express = require('express')
const router = express.Router()

//导入controller模块
const index = require('../controller/indexCon.js')
//res.render第一个参数是路径,相对于views文件夹
router.get('/',index.showIndex)
module.exports = router