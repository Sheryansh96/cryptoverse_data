const UserModel = require('./../models/UserModel')
const uuid = require('uuid').v4

exports.register = async (req,res) => {
    const {email} = req.body
    try {
        const user = await UserModel.findOne({email}).exec()
        console.log("2---",user)
        if(user){
            return res.status(400).send("User already exists")
        }

        const new_user = new UserModel({
            id:uuid(),
            email
        })

        console.log("3-----",new_user)


        new_user.save((err,data)=>{
            console.log("4-----",err)
            if(err) return res.status(500).send("Server Error")
            console.log("i am going here 2, err:",err)
            return res.json(data)
        })
    } catch (error) {
        return res.send(error)
    }
}

exports.login = async (req,res) => {
    const {email} = req.body
    try {
        const user = await UserModel.findOne({email}).exec()
        if(user){
            return res.json(user)
        }
        return res.json({})
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

exports.setDetail = async (req,res) => {
    const {email, coin, price, date, more} = req.body
    console.log(email, coin, price, date, more)
    let user
    try {
        if(coin == "BITCOIN"){
            console.log("Inside Bitcoin")
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'BITCOIN':more, 'BITCOIN_PRICE':price, 'BITCOIN_DATE':date}}, {upsert:true}).exec()
        }
        else if(coin == "ETHEREUM"){
            console.log("Inside Eth")
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'ETHEREUM':more, 'ETHEREUM_PRICE':price, 'ETHEREUM_DATE':date}}, {upsert:true}).exec()
        }
        else if(coin == "DOGE"){
            console.log("Inside Doge")
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'DOGE':more, 'DOGE_PRICE':price, 'DOGE_DATE':date}}, {upsert:true}).exec()
        }
        else if(coin == "CARDANO"){
            console.log("Inside Car")
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'CARDANO':more, 'CARDANO_PRICE':price, 'CARDANO_DATE':date}}, {upsert:true}).exec()
        }
        else{
            console.log("Inside Polka")
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'POLKA':more, 'POLKA_PRICE':price, 'POLKA_DATE':date}}, {upsert:true}).exec()
        }
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

exports.getUpdate = async (req,res) => {
    const {email, coin, status} = req.body
    console.log("Inside  Get Update")
    let user
    try {
        if(coin == "BITCOIN"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'BITCOIN':0, 'BITCOIN_PRICE':undefined, 'BITCOIN_DATE':undefined}}).exec()
        }
        else if(coin == "ETHEREUM"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'ETHEREUM':0, 'ETHEREUM_PRICE':undefined, 'ETHEREUM_DATE':undefined}}).exec()
        }
        else if(coin == "DOGE"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'DOGE':0, 'DOGE_PRICE':undefined, 'DOGE_DATE':undefined}}).exec()
        }
        else if(coin == "CARDANO"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'CARDANO':0, 'CARDANO_PRICE':undefined, 'CARDANO_DATE':undefined}}).exec()
        }
        else{
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{'POLKA':0, 'POLKA_PRICE':undefined, 'POLKA_DATE':undefined}}).exec()
        }
        if(user){
            return res.json(user)
        }
        return res.json({})
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
