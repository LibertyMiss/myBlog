const express = require('express')
const router = express.Router()

//res.render第一个参数是路径,相对于views文件夹
router.get('/', (req, res) => {
    res.render('./index.ejs', {})
})
module.exports = router