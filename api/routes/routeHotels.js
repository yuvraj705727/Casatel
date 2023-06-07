import express from "express";
import Hotel from "../models/modelHotel.js";
import createError from "../utils/error.js";
import { createHotel, updateHotel, deleteHotel, getHotel, 
    getHotels, countByCity, countByType, getHotelRooms } from "../controllers/controllerHotel.js";
import {verifyAdmin} from "../utils/verification.js";

const router= express.Router();
//'express.Router()' creates new router object ('router') that can be used to define routes for a specific part of a web application.

//CREATE
router.post("/createHotel", createHotel);

//UPDATE
router.put("/updateHotel/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/getHotel/:id", getHotel);

//GETALL
router.get("/", getHotels);

//COUNT HOTELS BY CITY
router.get("/countByCity", countByCity);

//COUNT ROOM BY TYPE
router.get("/countByType", countByType);

//GET HOTEL ROOM BY ID
router.get("/room/:id", getHotelRooms);

export default router;