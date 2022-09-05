import express from 'express';
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();



// //check authentication TEST 
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello USER, you are logged in!");
// });

// //check authentication TEST (need to be login & have ok JWT)
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello User, you are logged in and you can DELETE your account!")
// });

// //check authentication TEST (need to be login & have ok JWT)
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, you are logged in and you can DELETE all account!")
// });




//UPDATE
router.put('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET
router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', verifyAdmin, getUsers);



export default router;