import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();
connectDB();


const app = express();
app.use(express.json());

app.use('/api/books', bookRoutes);   // Books API routes
app.use('/api/auth', authRoutes);    // Auth API routes

app.get("/test",(req,res)=>{
    res.send("Api is running.....")

})

export default app;

