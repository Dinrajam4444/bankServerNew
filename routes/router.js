
// Import express

const express=require('express')

// Import register to this router.js file

const logic=require('../controllers/logic')


// import jwt middleware

const jwtMiddleware = require('../middlewares/routerMiddleware')







// Create an object for Router class in express

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

    router.get('/bankuser/user-profile/:acno',jwtMiddleware,logic.getProfile)     // Here we use a colon(:) to specify the varaiable acno as a param. 
                                                                                  // We use acno variable because the account number changes when inputting the value of the account number.
                
    
// path for user-balance

    router.get('/bankuser/user-balance/:acno',jwtMiddleware,logic.getBalance)

// path for money transfer

    router.post('/bankuser/money-transfer',jwtMiddleware,logic.moneyTransfer)

// path for transfer history

    router.get('/bankuser/user-history/:acno',jwtMiddleware,logic.history)

// delete account

    router.delete('/bankuser/user-delete/:acno',jwtMiddleware,logic.deleteAc)


// export router

    module.exports=router


