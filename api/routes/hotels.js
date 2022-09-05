import express from 'express';
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } from '../controllers/hotel.js';
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.put('/:id', verifyAdmin, updateHotel);

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

//GET
router.get('/find/:id', getHotel);

//GET ALL
router.get('/', getHotels);

//Get Hotels Filter by:
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
//find room and pass hotel ID
router.get('/room/:id', getHotelRooms);



export default router;