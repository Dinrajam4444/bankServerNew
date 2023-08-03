

const mongoose=require('mongoose')

// create model for collections
// schema - fields and values of collection

// Create a model - users

const users=new mongoose.model("users",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})

module.exports=users