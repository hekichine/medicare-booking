import { updateDoctor,getAllDoctor,getSingleDoctor, getDoctorProfile } from "../Controller/doctorController.js";
import express from "express";
import 'dotenv/config.js'
import { authenticate,restrict } from "../auth/verifyToken.js";
import reviewRoute from "./review.js";


const router = express.Router();

// nested router
router.use('/:doctorId/reviews',reviewRoute)

router.get('/:id',authenticate,restrict(['admin','doctor']),getSingleDoctor);

router.get('/',authenticate,restrict(['admin','doctor']),getAllDoctor);

router.put('/:id',authenticate,restrict(['admin','doctor']),updateDoctor);

router.get('/profile/me',authenticate,restrict(['doctor','admin']),getDoctorProfile)


export default router;
