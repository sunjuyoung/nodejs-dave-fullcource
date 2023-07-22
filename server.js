import dotenv from 'dotenv'

import express from 'express'
import path from 'path'
import root from './routes/root.js'
import {errorHandler} from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import corsOptions from './config/corsOptions.js';
import connectDB from './config/dbConn.js';
import mongoose from 'mongoose';

import { logEvents,logger } from './middleware/logger.js';
import userRoute from './routes/userRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

connectDB()

app.use(logger)
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname,'/public')))
//app.use('/', root)
app.use('/users',userRoute)

app.use(errorHandler)
mongoose.connection.once('open',()=>{
    console.log('connect mongodb')
    app.listen(PORT, ()=> console.log(`port ${PORT}`))
})

mongoose.connection.on('error',err=>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'dbErrorLog.log')

})





