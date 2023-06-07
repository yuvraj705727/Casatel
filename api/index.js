import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import authRoute from "./routes/routeAuth.js";
import hotelRoute from "./routes/routeHotels.js";
import roomRoute from "./routes/routeRooms.js";
import userRoute from "./routes/routeUsers.js";
import passport from "passport";
import { passportSetup } from "./passport.js";

const app= express(); //creating an instance 'app' for the express application to add middlewares and define routes to handle incoming requests.
dotenv.config(); //we can access environment variables from the '.env' file in our code using 'process.env'.

const connect= async() => {
    try {
        await mongoose.connect(process.env.mongourl);
        console.log("connected to the database...");
    } catch(error) {
        throw error;
    }
}; //here we connect the mongoDB database to our application.

//MIDDLEWARE

app.use(session({
    name: "session",
    secret: "casatel",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));

app.use(express.json()); //to parse json responses to the webpage.
app.use(cookieParser()); //to parse incoming http requests from and make them available in 'cookie' objects/

passportSetup();

app.use("/api/auth", authRoute); //middleware for authentication api requests.
app.use("/api/hotels", hotelRoute); //middleware for hotel api requests.
app.use("/api/rooms", roomRoute); //middleware for rooms api requests.
app.use("/api/users", userRoute); //middleware for users api requests.

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json(errorMessage);
}); //this middleware is used to handel errors.


app.listen(8000, ()=>{
    connect();
    console.log("Server started...");
}); //connecting to the server, when the server starts it listens on port no: 8000.