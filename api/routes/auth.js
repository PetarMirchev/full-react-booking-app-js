import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();


//http://localhost:8800/api/auth/register
router.post('/register', register);

//http://localhost:8800/api/auth/login
router.post('/login', login);




// //http://localhost:8800/api/auth
// router.get('/', (req, res) => {
//     res.send("hello, this is AUTH endpoint !");
// });
// //http://localhost:8800/api/auth/register
// router.get('/welcome', (req, res) => {
//     res.send("hello, this is Welcome endpoint !");
// });

export default router;