import { updateUser,getAllUser,getSingleUser, getUserProfile, getMyAppointment } from "../Controller/userController.js";

import express from "express";
import 'dotenv/config.js'
import { authenticate,restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get('/:id',authenticate,restrict(['patient','admin']),getSingleUser);

router.get('/',authenticate,restrict(['patient','admin']),getAllUser);

router.put('/:id',authenticate,restrict(['patient','admin']),updateUser);
// get profile
router.get('/profile/me',authenticate,restrict(['patient','admin']),getUserProfile);
router.get('/appointment/my-appointments',authenticate,getMyAppointment);

export default router;