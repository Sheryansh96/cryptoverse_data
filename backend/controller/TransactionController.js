const UserModel = require('./../models/transactionModel')
const uuid = require('uuid').v4

exports.updateTable = async (req,res) => {
    const {email, coin, price, date, status} = req.body
    console.log(email, coin, price, date, status)
    let user
    try {
        user = await UserModel.findOneAndUpdate({'email':email}, {$push:{coin:coin, prediction:price, date:date, status:status}},{upsert:true}).exec()
        if(user){
            return res.json(user)
        }
        return res.json({})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error")
    }
}


exports.sendDetails = async (req,res) => {
    try{
        const {email} = req.body
        console.log(email)
        let u = await UserModel.findOne({'email':email})
        if(u){
            console.log(u)
            return res.json(u)
        }
        else{
            console.log(u)
            return res.json({})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error")
    }

}

exports.deleteUser = async (req, res) => {
    try{
        const {email} = req.body
        const user = await UserModel.findOneAndDelete({'email':email})
        let u = await UserModel.findOne({'email':email})
        console.log("Deleting object")
        return res.json(u)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error")
    }
}
