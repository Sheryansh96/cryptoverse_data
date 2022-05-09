const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    BITCOIN:{ type: Number, default: 0 },
    ETHEREUM: { type: Number, default: 0 },
    DOGE:{ type: Number, default: 0 },
    POLKA:{ type: Number, default: 0 },
    CARDANO:{ type: Number, default: 0 },
    BITCOIN_PRICE:{
        type:Number
    },
    ETHEREUM_PRICE:{
        type:Number
    },
    DOGE_PRICE:{
        type:Number
    },
    POLKA_PRICE:{
        type:Number
    },
    CARDANO_PRICE:{
        type:Number
    },
    BITCOIN_DATE:{
        type:String
    },
    ETHEREUM_DATE:{
        type:String
    },
    DOGE_DATE:{
        type:String
    },
    POLKA_DATE:{
        type:String
    },
    CARDANO_DATE:{
        type:String
    }
}, 
    {timestamps:true}
);

module.exports = User = mongoose.model('TestUser1',UserSchema)