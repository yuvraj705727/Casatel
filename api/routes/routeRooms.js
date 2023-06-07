import express from "express";
import {createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability} from "../controllers/controllerRoom.js";
import { verifyAdmin } from "../utils/verification.js";

const router= express.Router();
//'express.Router()' creates new router object ('router') that can be used to define routes for a specific part of a web application.

//CREATE ROOM
router.post("/:hotelid", createRoom);

//UPDATE ROOM
router.put("/updateRoom/:id", verifyAdmin, updateRoom);

//CHECK AVAILABILITY
router.put("/available/:id", updateRoomAvailability);

//DELETE ROOM
router.delete("/:roomid/:hotelid", deleteRoom);

//GET ROOM
router.get("/getRoom/:id", getRoom);

//GET ROOMS
router.get("/", getRooms);

export default router;