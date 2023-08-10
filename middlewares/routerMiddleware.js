// import jwt library

const jwt=require('jsonwebtoken')

// create middleware
// middleware - a function with 3 arguements.   - req, res, next


const jwtMiddleware=(req,res,next)=>{
    
    
    try {
        // access token from request's header section
        const token=req.headers["access_token"] // If token not accessed there will be an error - runtime error.
                                            // That is a user(who didn't login) who try to access the methods after the login, this error will show up.
        
        // validate token - jwt - use verify() to validate
        jwt.verify(token,"secretkey123")    // if the token came here verified using the secretkey,then the o/p will be true or rlse it will be false.

        // if the token is verified, to continue the rquest, we use next.
        next()


    } 
    catch{
        res.status(404).json("Please login")
    }                                      

}

module.exports=jwtMiddleware