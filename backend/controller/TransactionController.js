const UserModel = require('./../models/transactionModel')
const uuid = require('uuid').v4

exports.updateTable = async (req,res) => {
    const {email, coin, price, date, status} = req.body
    console.log(email, coin, price, date, status)
    let user
    try {
        user = await UserModel.findOneAndUpdate({'email':email}, {$push:{coin:coin, prediction:price, date:date, status:status}}).exec()
        if(user){
            return res.json(user)
        }
        return res.json({})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error")
    }
}

