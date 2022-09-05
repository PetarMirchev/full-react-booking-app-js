//npm install jquery --save   
//npm install bootstrap --save     
//npm install @popperjs/core --save  
//npx create-react-app ./
//npm install react-router-dom
//npm i --save @fortawesome/fontawesome-svg-core
//npm install react-date-range
//npm install date-fns    
//npm install express     
//npm install nodemon   
//npm install dotenv      
//npm install mongoose    
//npm install bcryptjs    
//npm install jsonwebtoken
//npm install cookie-parser
//"cors" for fix Access to XMLHttpRequest at '...' from origin 'localhost:8800' has been blocked by CORS policy in development mode 
//npm install cors

import User from '../models/User.js';
//bcryptjs for Hash user password 
import bcrypt from "bcryptjs";
//jsonwebtoken 
import jwt from "jsonwebtoken";

import { createError } from "../utils/error.js";



//register function
export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashPassword,
        });

        await newUser.save()
        res.status(201).send("User has been created/register!")
    } catch (err) {
        next(err);
    }
};



//login function
export const login = async (req, res, next) => {
    try {
        //check username
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"))

        //check password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Entered password not correct!"))

        //if password is correct whe create new token for user (is admin?)
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_secret_key);

        const { password, isAdmin, ...otherDetails } = user._doc;

        //cookie access_token --> only by (httpOnly: true) more secure!
        res.cookie("access_token", token, { httpOnly: true, }).status(200).json({ ...otherDetails, isAdmin });
    } catch (err) {
        next(err);
    }
};