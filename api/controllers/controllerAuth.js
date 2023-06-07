import User from "../models/modelUser.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

const CLIENT_URL = "http://localhost:3000/";

//REGISTER
export const register = async (req, res, next) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) return next(createError(400, "User already exists!"));

        //hashing and salting to encrypt the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //saving the user in the database
        const newUser = new User({
            ...req.body,
            password: hash
        });
        await newUser.save();

        res.status(200).send("new user has been created...");
    } catch(err) {
        next(err);
    }
}

//LOGIN
export const login = async (req, res, next) => {
    try {
        //checking username
        const user= await User.findOne({username: req.body.username});
        if(!user) return next(createError(400, "User not found!"));

        //checking password
        const userPassword= await bcrypt.compare(req.body.password, user.password);
        if(!userPassword) return next(createError(401, "Wrong password or username!"));

        user.loginCount += 1; 
        await user.save();

        //signs a JSON Web Token (JWT) using the user's ID and isAdmin status, along with a secret key stored in an environment variable.
        const token= jwt.sign({_id: user.id, isAdmin: user.isAdmin}, process.env.jwtSecret);

        const {password, isAdmin, ...otherDetails} = user._doc;

        //adding cookie using JWT
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...otherDetails, isAdmin});
    } catch(err) {
        next(err);
    }
} 

//LOGOUT
export const logout = (req, res, next) => {
    try {
        res.clearCookie('access_token').send("Logged Out successfully!");
    } catch(err) {
        next(err);
    }
};

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

//VERIFY ADMIN
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            res.status(200);
        } else{
            return next(createError(403, "User not Authorized!"));
        }
    });
}