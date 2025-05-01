import cookieParser from 'cookie-parser';
import express from 'express'
import cors from "cors"
import 'dotenv/config'
import connectDB from './db/db.js';
import userRouter from './routes/userRoutes.js';

const app = express();

const port = process.env.PORT || 4000;

// remove the forward slash /
const allowedOrigins =['http://localhost:5173','https://backed-auth-szcg.vercel.app'] 
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))


connectDB();

app.get("/",(req,res)=>{res.send("Api is working")})
app.use("/api/user",userRouter);
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`);
})