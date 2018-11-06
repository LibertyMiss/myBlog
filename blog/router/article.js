const express = require('express')
const router = express.Router()

const controller = require('../controller/article.js')

router.get('/article', controller.article)

module.exports = router