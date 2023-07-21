const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')


const validateToken = asyncHandler(async (req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization; //headerS remember the "s"
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {
            if(err){
                res.status(401);
                throw new Error('User is not authorized');
            }
            // console.log(decoded);
            req.user = decoded.user;
            next();
        });
    }
    else{
        res.status(401);
        throw new Error('User is not authorized or token is missing in the request');
    }
})

module.exports= validateToken;