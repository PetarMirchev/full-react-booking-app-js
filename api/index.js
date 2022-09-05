import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

//************************************************************************************* */

//import on file 'routes'
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

//********************************************************************************** */

import cookieParser from "cookie-parser";

//*************************************************************************** */

import cors from "cors";

//********************************************************************************** */

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_KEY);
        console.log("MongoDB acc & pass OK!");
    } catch (error) {
        throw error;
    }
};


mongoose.connection.on('error', err => {
    logError(err);
});


mongoose.connection.on("disconnected", () => {
    console.log("ERROR connect or reconnect to MongoDB!");
});


mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
});



app.listen(8800, () => {
    connect();
    console.log("connected to back-end at port:8800 !");
});

//***************************************************************************************************************** */


// API point
///http://localhost:8800/
// app.get("/", (req, res) => {
//     res.send("hello request (/ Home)!");
// });


//"cors" for fix Access to XMLHttpRequest at '...' from origin 'localhost:3000' has been blocked by CORS policy in development mode 
//This fix the POST request from react app in development mode. 
app.use(cors());


//middleware
app.use(cookieParser());

//middleware's to access routes
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


//middleware's for err on API
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Hello Error from Handler! Something went wrong Bro!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        massage: errorMessage,
        stack: err.stack,
    })
})