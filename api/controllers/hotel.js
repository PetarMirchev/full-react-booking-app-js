import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


//CREATE Hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const saveHotel = newHotel.save();
        res.status(200).json(saveHotel)
    }
    catch (err) {
        next(err);
    }
};

//UPDATE Hotel
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    }
    catch (err) {
        next(err);
    }
};

//DELETE Hotel
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted!");
    }
    catch (err) {
        next(err);
    }
};

//GET info for 1 hotel (by ID)
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch (err) {
        next(err);
    }
};


//GET ALL Hotels
export const getHotels = async (req, res, next) => {
    //params for query
    const { min, max, ...others } = req.query;
    try {
        ///api/hotels?featured=true&limit=2&min=10&max=200
        //limit(req.query.limit) --> to show specified number set in the query (&limit=2&)
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 }, }).limit(req.query.limit);
        res.status(200).json(hotels);
    }
    catch (err) {
        next(err);
    }
};



//GET By City
export const countByCity = async (req, res, next) => {
    //array will be split by "," (sofia, berlin, RandomCity..)
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
                //Hotel.find({ city: city }).length -- is the same as "countDocuments" mongoDB, but more slow
            }));
        res.status(200).json(list);
    }
    catch (err) {
        next(err);
    }
};



//GET By Type - hotel, apartment, villa, resort, cabin
export const countByType = async (req, res, next) => {
    try {
        //whe have 5 type of properties & whe search for each 1
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        //send all in array
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "villa", count: villaCount },
            { type: "resort", count: resortCount },
            { type: "cabin", count: cabinCount },
        ]);
    }
    catch (err) {
        next(err);
    }
};


//get rooms (for book) in selected hotel
export const getHotelRooms = async (req, res) => {
    try {
        //1 find the selected hotel
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}