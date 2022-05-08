const express = require('express')
const router  = express.Router()

const transactionController = require('./../controller/TransactionController')

router.post('/update',transactionController.updateTable)

module.exports = router