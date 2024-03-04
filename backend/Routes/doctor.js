import { updateDoctor,getAllDoctor,getSingleDoctor } from "../Controller/doctorController.js";
import express from "express";
import 'dotenv/config.js'
import { authenticate,restrict } from "../auth/verifyToken.js";
import reviewRoute from "./review.js";


const router = express.Router();

// nested router
router.use('/:doctorId/reviews',reviewRoute)

router.get('/:id',authenticate,restrict(['admin','patient']),getSingleDoctor);

router.get('/',authenticate,restrict(['admin','patient']),getAllDoctor);

router.put('/:id',authenticate,restrict(['admin']),updateDoctor);


export default router;
