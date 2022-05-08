const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const TransactionSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    coin:[{
        type:String
    }],
    prediction:[{
        type:String
    }],
    date:[{
        type:String
    }],
    status:[{
        type:Boolean
    }]
}, 
    {timestamps:true}
);

module.exports = User = mongoose.model('transaction',TransactionSchema)