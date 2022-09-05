import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
//from model Hotel.js whe have --> rooms: {type: [String],} so whe need (parent and child)
import Hotel from "../models/Hotel.js";



//book room in hotel
export const createRoom = async (req, res, next) => {

    //find 1 hotel by his ID & then book the room
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)


    //error block if Hotel is not find or room
    try {
        const saveRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: saveRoom._id } });
        } catch (err) {
            next(err);
        }
        res.status(200).json(saveRoom);
    } catch (err) {
        next(err);
    }
};


//change Room 
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};



//check for available rooms and update status of the rooms (free or used)
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id }, { $push: { "roomNumbers.$.unavailableDates": req.body.dates } });
        res.status(200).json("Room status has been updated!");
    } catch (err) {
        next(err);
    }
};


//res.status(200).json("Room has been deleted/cancelled!");
//cancel/delete room
export const deleteRoom = async (req, res, next) => {

    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            const hotelId = req.params.hotelid;
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted/cancelled!");
    } catch (err) {
        next(err);
    }
};


//get 1 room
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};


//get all rooms
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};