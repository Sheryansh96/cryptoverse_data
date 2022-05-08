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
    const {email, coin, price, date} = req.body
    console.log(email, coin, price, date, more)
    let user
    try {
        if(coin == "BITCOIN"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{btc:more, btc_price:price, btc_date:date}}).exec()
        }
        else if(coin == "ETHEREUM"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{eth:more, eth_price:price, eth_date:date}}).exec()
        }
        else if(coin == "DOGE"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{doge:more, doge_price:price, doge_date:date}}).exec()
        }
        else if(coin == "CARDANO"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{card:more, card_price:price, card_date:date}}).exec()
        }
        else{
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{polka:more, polka_price:price, polka_date:date}}).exec()
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

exports.getUpdate = async (req,res) => {
    const {email, coin, status} = req.body
    console.log(email, coin, price, date, more)
    let user
    try {
        if(coin == "BITCOIN"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{btc:undefined, btc_price:undefined, btc_date:undefined}}).exec()
        }
        else if(coin == "ETHEREUM"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{eth:undefined, eth_price:undefined, eth_date:undefined}}).exec()
        }
        else if(coin == "DOGE"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{doge:undefined, doge_price:undefined, doge_date:undefined}}).exec()
        }
        else if(coin == "CARDANO"){
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{card:undefined, card_price:undefined, card_date:undefined}}).exec()
        }
        else{
            user = await UserModel.findOneAndUpdate({'email':email}, {$set:{polka:undefined, polka_price:undefined, polka_date:undefined}}).exec()
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
