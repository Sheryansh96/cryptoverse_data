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
        trim:true
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
    btc_price:{
        type:Number
    },
    eth_price:{
        type:Number
    },
    doge_price:{
        type:Number
    },
    polka_price:{
        type:Number
    },
    card_price:{
        type:Number
    },
    btc_date:{
        type:String
    },
    eth_date:{
        type:String
    },
    doge_date:{
        type:String
    },
    polka_date:{
        type:String
    },
    card_date:{
        type:String
    },
    
}, 
    {timestamps:true}
);

module.exports = User = mongoose.model('User',UserSchema)