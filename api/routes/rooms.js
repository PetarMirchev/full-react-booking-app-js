import express from 'express';
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from "../utils/verifyToken.js";



const router = express.Router();

//CREATE new room
router.post('/:hotelid', verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//Update availability of rooms
router.put('/availability/:id', updateRoomAvailability);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET 1 Room
router.get('/:id', getRoom);

//GET ALL  Rooms
router.get('/', getRooms);



export default router;