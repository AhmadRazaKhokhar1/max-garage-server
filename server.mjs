import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes.js';
dotenv.config();

const uri = process.env.MONGO_URI_MAX_GARAGE;
const port = process.env.PORT;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/max-garage/api/', userRouter);
app.use('/max-garage/api/', productRouter);

app.use('/imagesCache', express.static('imagesCache'))

//port
app.listen(port, ()=>{
    console.log(`The app is live at : ${port} 🔥`);
});

//Mongo Data Base Connection Configurations
try {
    mongoose.connect(uri)
    console.log(`Connection Established to Data Base ✅`)
} catch (error) {
    console.log(`Error in establishing connection to Data Base ⚠️!: ${error}`)
}
    mongoose.connection.on('disconnected', ()=>{
    console.log(`Connection to Data Base Terminated ❌`)
})
mongoose.connection.on('connected', ()=>{
    console.log(`Connection Established to Data Base ✅`)
})