import express from "express";
import { createUser, updateUser, deleteUser, getUser, getUsers} from "../controllers/controllerUser.js";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verification.js"

const router= express.Router();
//'express.Router()' creates new router object ('router') that can be used to define routes for a specific part of a web application.


//VERIFYING USER
router.get("/checkUser/:id", verifyUser, (req, res, next) => {
    res.send("User Verification successful! User privileges granted.");
});

//VERIFYING ADMIN
router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Admin Verification successful! Admin privileges granted.");
})

//AUTHENTICATION
router.get("/checkAuthentication", verifyToken, (req, res, next) => {
    res.send("Login Successful!");
});//This is used for verifying user and verifying admin, it checks the token and authenticates the user.

//CREATE USER
router.post("/createUser", createUser);

//UPDATE USER
router.put("/updateUser/:id", verifyUser, updateUser);

//DELETE USER
router.delete("/:id", deleteUser);

//GET USER
router.get("/getUser", getUser);

//GETALL USERS
router.get("/", getUsers);

export default router;