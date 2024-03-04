import { updateUser,getAllUser,getSingleUser } from "../Controller/userController.js";

import express from "express";
import 'dotenv/config.js'
import { authenticate,restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get('/:id',authenticate,restrict(['doctor','admin']),getSingleUser);

router.get('/',authenticate,restrict(['doctor','admin']),getAllUser);

router.put('/:id',authenticate,restrict(['doctor','admin']),updateUser);

export default router;