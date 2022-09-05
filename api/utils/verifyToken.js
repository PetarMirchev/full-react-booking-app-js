import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";


//check user Token is OK?
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated! (no token)"));
    };

    jwt.verify(token, process.env.JWT_secret_key, (err, user) => {
        if (err) return next(createError(403, "Your, Token is not valid! (expired)"));
        req.user = user;
        next();
    });
};


//validate User actions (is login? and have ok JWT)
export const verifyUser = (req, res, next) => {
    //1 check Token & 2 check User ID
    verifyToken(req, res, next, () => {
        //only owner User can delete acc or Admin!
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            if (err) return next(createError(403, "You are not authorized (owner bro..)!"));
        }
    });
};



// is User = Admin?
export const verifyAdmin = (req, res, next) => {
    //1 check Token & 2 check is Admin?
    verifyToken(req, res, next, () => {
        //only  Admin can continued!
        if (req.user.isAdmin) {
            next();
        } else {
            if (err) return next(createError(403, "You are not authorized (not Admin)!"));
        }
    });
};
