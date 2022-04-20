const express = require('express')
const app = express()
const mongo = require('mongoose')
const cors = require('cors')

const db = require('./config/dj.json')


console.log(db.host)
mongo.connect(db.host,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log("Faield to connected to db",err)
})

app.use(cors())
app.use(express.json())

app.use('/api',require('./routes/user.routes'))


app.listen(8585,(req,res)=>{
    console.log('Server eruninign')
})
