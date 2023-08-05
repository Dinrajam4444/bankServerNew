
// Import express

const express=require('express')

// Import register to this router.js file

const logic=require('../controllers/logic')

// // Create an object for Router class in express

const router=new express.Router()

// setting path for register function in logic

router.post('/bankuser/user-register',logic.register)

// path for login       // Here the http request will have two types of data with it. (Account Number and password)
                        // So it has to use body section of http request. 
                        // Post type request has body section(can carry more than one data),
                        // whereas get type request can only carry a single data.
                        // So we use post request here


// path for login request

router.post('/bankuser/user-login',logic.login)

// path for user-profile


router.get('/bankuser/user-profile/:acno',logic.getProfile)      
                                                                
                                                               
 // export router

    module.exports=router


