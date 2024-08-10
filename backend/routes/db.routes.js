const express = require('express')
const router = express.Router()
const DbController = require('../controllers/db.controller')

router.get('/generate' , DbController.generateDb)

module.exports = router
