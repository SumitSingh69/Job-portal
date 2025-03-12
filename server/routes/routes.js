import express from 'express';
import { login, logout, refreshAccessToken, signUp } from '../controller/user.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/user/signup',signUp)
router.post('/user/login',login)
router.post('/user/logout' , verifyAccessToken , logout)

router.post('/user/refresh-token', refreshAccessToken);

// router.put('/user/:id',updateUser)  
// router.delete('/user/:id',deleteUser)

export default router;

