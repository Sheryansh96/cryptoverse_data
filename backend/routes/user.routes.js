const express = require('express')
const router  = express.Router()

const UserController = require('./../controller/UserController')

router.post('/register',UserController.register)
router.post('/findByEmail',UserController.login)

router.post('/setTransactionDetail', UserController.setDetail)
router.post('/setUpdate', UserController.getUpdate)
router.post('/getUpdate', UserController.sendDetails)
router.post('/delUser', UserController.deleteUser)

module.exports = router