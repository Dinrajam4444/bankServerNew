// import jwt

const jwt=require('jsonwebtoken')

// Import model

const users = require("../models/modelcollection")

// logic for register

const register=(req,res)=>{             // body = {acno:123,uname:anu,psw:abc123}   // body - body of the http request coming from the front end
    
    // access datas from body (getting the values of of acno,uname and psw from body)

    const acno=req.body.acno
    const uname=req.body.uname
    const psw=req.body.psw


    // check acno is present in users collection 

    users.findOne({acno}).then(user=>{                 // Here the arguement of findOne is a key:value pair. 
                                                       // The key will be the key in which are searching for the acno (in the users model) 
                                                       // And the value is the key we are seraching. Here it is acno.
                                                       // Since both the keys are of the same name, we can write it as single key.
                                                       // the variable user used in then() stores the output of the findOne method.
       
        if(user){                             // If there is an object comes inside user, then the if condition will be true.That means a user is already present
            res.status(401).send("User already exist")                             
        }
        else{

            // register user - create a new object for user(model)

            var newUser=new users({           // The keys used inside this should be matching the keys in the model. (model collection.js)
                acno,
                uname,
                psw,
                balance:0,
                transactions:[]
            })

            // save the object in collection
                newUser.save()
            
            // response() - used to send response to frontend        // json() -convert javascript data into json type data and send the response as well.

                res.status(200).json(newUser)
        }
    })

    }

    // logic for login

    const login=(req,res)=>{              // body = {acno:1000,psw:"abc123"}

        const {acno,psw}=req.body
        users.findOne({acno,psw}).then(user=>{
            if(user){

                //generate token
                var token=jwt.sign({acno},"secretkey123")       // We can put these secretdata ina string. 
                                                                // These secret key shouldn't contain special characters. 
                                                                // It shoulld only consists of characters and numbers only.
                                                                
                // user["token"]=token
                res.status(200).json({
                    acno:user.acno,
                    uname:user.uname,
                    token
                })

            }
            else{
                res.status(401).json("Incorrect Acno or Password")
            }
        })

    }

    // logic to get profile datas
    
    const getProfile=(req,res)=>{

        // access acno param from url req

        const {acno}=req.params
        users.findOne({acno}).then(user=>{
            if(user){
                res.status(200).json({
                    acno:user.acno,
                    uname:user.uname
                })
            }
            else{
                res.status(401).json("user not exist")
            }
        })
    }


    // logic to get balance details

    const getBalance=(req,res)=>{

        // access acno params from url req

        const {acno}=req.params     // Written as destructured. Here const {acno}=req.params.acno
        users.findOne({acno}).then(user=>{
            if(user){
                res.status(200).json({uname:user.uname,balance:user.balance})
            }
            else{
                res.status(401).json("user not exist")
            }
        })
    }

    // logic for money transfer

    const moneyTransfer=(req,res)=>{

        //access all datas from body
        const {fromAcno,toAcno,psw,amount,date}=req.body

        // convert amount to number
        // Here the amount which we are giving at the input end will be of string type.
        // We need to convert it to number type so as to do the adding or substracting amount (debiting or crediting of amount).
        // we do it using parseInt()

        var amnt=parseInt(amount)

        // check fromUser in database
        users.findOne({acno:fromAcno,psw}).then(fromUser=>{
            if(fromUser){
                //check for toUser in database
                users.findOne({acno:toAcno}).then(toUser=>{
                    if(toUser){
                        // fromUser balance check
                        if(amnt<=fromUser.balance){
                            fromUser.balance-=amnt
                            fromUser.transactions.push({type:"DEBIT",amount:amnt,date,user:toUser.uname,user:toUser.uname})
                            fromUser.save()

                            toUser.balance+=amnt    //toUser.balance = toUser.balance+amnt
                            toUser.transactions.push({type:"CREDIT",amount:amnt,date,user:fromUser.uname,user:fromUser.uname})
                            toUser.save()

                            res.status(200).json({message:"Transaction success"})
                        }
                        else{
                            res.status(401).json({message:"Insufficient balance"})
                        }

                    }
                    else{
                        res.status(401).json({message:"Invalid credit credentials"})
                    }
                })
            }
            else{
                res.status(401).json({message:"Invalid debit credentials"})
            }
            
        })

    }

    // logic to transaction history

    const history=(req,res)=>{
        const {acno}=req.params
        users.findOne({acno}).then(user=>{
            if(user){
                res.status(200).json(user.transactions)
            }
            else{
                res.status(401).json("user not exist")
            }
        })
    }
    
    // logic to delete an account

    const deleteAc=(req,res)=>{
        const {acno}=req.params
        users.deleteOne({acno}).then(user=>{            // Here the response gets is not a data. It will be delete count. deleteCount-1/0
                                                        // If one user gets deleted(his object deleted), the deleteCount is 1 .If not,it will be 0.
            if(user){
                res.status(200).json("Account Deleted Successfully")
            }
            else{
                res.status(401).json("User does not exist")
            }
        })
    }

module.exports={
    register,login,getProfile,getBalance,moneyTransfer,history,deleteAc
}
