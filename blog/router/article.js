const express = require('express')
const router = express.Router()

const controller = require('../controller/article.js')

router.get('/article', controller.article)
router.get('/article/info/:id', controller.info)
router.get('/article/edit/:id', controller.edit)
router.post('/article/edit', controller.editPost)
module.exports = router