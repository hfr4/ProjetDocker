const express = require('express')
const router = express.Router()
const jwt = require('../jwt.js')
const UserController = require('../controllers/user.controller')

router.get   ('/'      , UserController.getUsers)
router.get   ('/:id'   , UserController.getUser)
router.post  ('/login' , UserController.loginUser)
router.post  ('/signin', UserController.createUser)
router.put   ('/:id'   , jwt.verifyJwt, UserController.updateUser)
router.delete('/:id'   , jwt.verifyJwt, UserController.deleteUser)

module.exports = router
