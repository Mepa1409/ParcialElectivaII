const express = require('express')
const router = express.Router()

router.use('/', require('./web/page_routes'))

module.exports = router