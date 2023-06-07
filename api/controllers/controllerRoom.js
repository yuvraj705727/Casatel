import Hotel from "../models/modelHotel.js";
import Room from "../models/modelRoom.js";

//CREATE ROOM
export const createRoom = async (req, res, next) => {
    const hotelId= req.params.hotelid;
    const newRoom= new Room(req.body);

    try {
        const savedRoom= await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(
                hotelId, 
                {$push: {rooms: savedRoom._id}}
            );
        } catch(err) {
            next(err);
        }

        res.status(200).json(savedRoom);
    } catch(err) {
        next(err);
    }
}

//UPDATE ROOM
export const updateRoom= async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body}, 
            {new: true}
        );

        res.status(200).json(updatedRoom);
    } catch(err) {
        next(err);
    }
}

//CHECK AVAILABLE
export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
};

//DELETE ROOM
export const deleteRoom = async (req, res, next) => {
    const hotelId= req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.roomid);
        try {
            await Hotel.findByIdAndUpdate(
                hotelId, 
                {$pull: {rooms: req.params.roomid}}
            );
        } catch(err) {
            next(err);
        }
        res.json("Room has been Deleted!");
    } catch(err) {
        next(err);
    }
}

//GET ROOM
export const getRoom = async (req, res, next) => {
    try {
        const room= await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch(err) {
        next(err);
    }
}

//GETALL ROOM
export const getRooms = async (req, res, next) => {
    try {
        const rooms= await Room.find();
        res.status(200).json(rooms);
    } catch(err) {
        next(err);
    }
}