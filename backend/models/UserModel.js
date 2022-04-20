const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const UserSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    first_name :{
        type:String,
        trim:true,
        required:true
    },
    last_name :{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:3,
        max:64
    },
    btc:{
        type:Number,
    },
    eth:{
        type:Number,
    },
    doge:{
        type:Number,
    },
    polka:{
        type:Number,
    },
    card:{
        type:Number,
    },
    balance:{
        type:Number
    },
    coin:{
        type:String
    },
    start:{
        type:String
    },
    end:{
        type:String
    }
}, 
    {timestamps:true}
);

module.exports = User = mongoose.model('User',UserSchema)