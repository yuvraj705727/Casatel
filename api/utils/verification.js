import jwt from "jsonwebtoken";
import createError from "./error.js";

//VERIFYING TOKEN
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if(!token) return next(createError(401, "User not Authenticated!"));

    jwt.verify(token, process.env.jwtSecret, (err, user) => {
        if(err) return next(createError(403, "Token is Invalid!"));

        req.user= user;
        next();
    });
}

//VERIFY USER
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if((req.user._id === req.params.id) || req.user.isAdmin){
            next();
        } else{
            return next(createError(403, "User not Authorized!"));
        }
    });
}

//VERIFY ADMIN
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next();
        } else{
            return next(createError(403, "User not Authorized!"));
        }
    });
}