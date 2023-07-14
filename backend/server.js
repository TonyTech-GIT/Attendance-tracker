import express, { urlencoded } from 'express'
import colors from 'colors';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import adminRoute from './routes/adminRoute.js'
import authRoute from './routes/authRoute.js';
import studentRoute from './routes/studentRoute.js'
import cors from 'cors'
dotenv.config()

connectDB()

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(cors())

app.use('/', authRoute)

app.use('/auth/admin', adminRoute)

app.use('/auth/studentReg', studentRoute)

app.use(errorHandler)

app.listen(port, console.log(`Server started on port ${port}`))