const express = require('express')
const router  = express.Router()

const UserController = require('./../controller/UserController')

router.post('/register',UserController.register)
router.post('/findByEmail',UserController.login)

module.exports = router