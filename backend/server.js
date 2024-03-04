import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from "./routes.js";


dotenv.config();

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
  origin: true,
}

app.get('/',(req,res)=>{
  res.send('Api is working');
})

// connect database
mongoose.set('strictQuery',false);
const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL,{
      
    })
    console.log("Mongo dtb is connected");
  } catch (error) {
    console.log("Mongo dtb is connecte error");
  }
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
routes(app);

app.listen(port,()=>{
  connectDB();
  console.log("Server is running on port", port);

});

