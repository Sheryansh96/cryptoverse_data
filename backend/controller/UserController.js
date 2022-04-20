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