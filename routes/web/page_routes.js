const express = require('express')
const router = express.Router()

const {index} = require('../../app/http/controllers/web/main_controller')

router.get('/', index)

module.exports = router