
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");


app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

//Import Routes

const authRoutes = require('./routes/auth');
const postRoute = require('./routes/posts')
const adminPostRoute = require('./routes/adminPost')

dotenv.config();

//connect to DB

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true },
    () => console.log('connected to DB'));

//Middlewares

app.use(express.json());


//Route Middlewares

app.use('/api/user', authRoutes);
app.use('/api/posts', postRoute);
app.use('/api/admin', adminPostRoute);

app.listen(3000,() => console.log('server running'));
