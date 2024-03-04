
import express from "express";
import { register,login } from "../Controller/authController.js";
import 'dotenv/config.js'

const router = express.Router();

  // register
  router.post('/register', register);
  // login
  router.post('/login', login);


export default router;