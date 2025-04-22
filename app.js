import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';


dotenv.config();
connectDB();


const app = express();
app.use(express.json());

app.get("/test",(req,res)=>{
    res.send("Api is running.....")

})

export default app;

