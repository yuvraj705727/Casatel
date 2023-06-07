import User from "../models/modelUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";

//CREATE USER
export const createUser = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) return next(createError(400, "User already exists!"));

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();

        res.status(200).send("new user has been created...");
    } catch(err) {
        next(err);
    }
}

//UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const user= await User.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true});
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}

//DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        const user= await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted...");
    } catch(err) {
        next(err);
    }
}

//GET USER
export const getUser = async (req, res, next) => {
    try {
      const token = req.cookies.access_token;
      const decodedToken = jwt.verify(token, process.env.jwtSecret);
      const userId = decodedToken._id;
      const user = await User.findById(userId).select("-password");
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
}

//GETALL USER
export const getUsers = async (req, res, next) => {
    try {
        const user= await User.find();
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}