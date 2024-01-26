//authenticity
//isStudent
//isAdmin

const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.middle = (req, res, next) => {
    try {
        console.log("cookie",req.cookies.token);
        console.log("body",req.body.token);
        console.log("header",req.header("Authorization"));
        
        const token = 
        req.cookies.token ||
         req.body.token ||
         req.header("Authorization").replace("Bearer ","") 
        // const token= req.cookie.token 
        if (!token || token === undefined ) {
            return res.status(401).json ({
                success: false,
                message: 'token  missing '
            })
        }
        //verify the token using jwt verify method
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload)

            req.user = payload;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid'
            })
        }

        //next middleware
        next()

    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'something went wrong , while verifying the token ',
            error:error.message
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role != "student") {
            return res.status(401).json({
                success: false,
                message: 'this is a protected route for students'
            })
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'user Role is not matching ',
        })
    }
}


exports.isAdmin=(req,res,next)=>{
    try {
        if (req.user.role != "admin") {
            return res.status(401).json({
                success: false,
                message: ' this is a protected route for admin'
            })
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'user Role is not matching ',
        })
    }
}

