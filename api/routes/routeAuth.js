import express from "express";
import passport from "passport";
import { register, login, logout, verifyAdmin } from "../controllers/controllerAuth.js";

const router= express.Router();
//'express.Router()' creates new router object ('router') that can be used to define routes for a specific part of a web application.

const CLIENT_URL = "http://localhost:3000/";

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//LOGOUT
router.get("/logout", logout);

//VERIFY ADMIN
router.get("/verifyAdmin", verifyAdmin)

//OAUTH LOGIN SUCCESS
router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
      });
    }
});

//OAUTH LOGIN FAILURE
router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
});

//OAUTH LOGOUT
router.get("/oauthLogout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.clearCookie("access_token").redirect(CLIENT_URL);
    });
});

//LOGIN USING OAUTH
router.get("/google", 
    passport.authenticate("google", {scope: ["profile", "email"]})
);

//OAUTH CALLBACK
router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed"
    })
);

export default router;