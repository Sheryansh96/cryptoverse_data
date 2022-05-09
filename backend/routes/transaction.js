const express = require('express')
const router  = express.Router()

const transactionController = require('./../controller/TransactionController')

router.post('/update',transactionController.updateTable)
router.post('/getDetails',transactionController.sendDetails)
router.post('/delUser', transactionController.deleteUser)

module.exports = router