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
                                                       // and the value is the key we are seraching. Here it is acno.
                                                       // Since both the keys are of the same name, we can write it as single key.
                                                       // the variable user used in then() stores the output of the findOne method.
       
        if(user){                             // If there is an object comes inside user, then the if condition will be true.That means a user is already present
            res.status(401).send("User already exist")                             
        }
        else{

            // register user - create a new object for user

            var newUser=new users({           // The keys used inside this should be matching the keys in the model. (model collection.js)
                acno,
                uname,
                psw,
                balance:0,
                transactions:[]
            })

            // save the object in collection
                newUser.save()
            
            // response send to frontend        // json() -convert javascript data into json type data and send the response as well.

                res.status(200).json(newUser)
        }
    })

    }

                                           





module.exports={
    register
}
