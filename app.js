const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const app = express();
const genresRouter = require('./routes/genres');
const customerRouter = require('./routes/customers');
const movieRouter = require('./routes/movies');
const rentalRouter = require('./routes/rentals');
const userRouter = require('./routes/users');
const authRouter = require('./auth');


const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movierental')
.then(() => console.log('Connected to MongoDB......'))
.catch(err => console.log('Could not connect to MongoDB.....', err))

app.use(express.json());

app.use('/api/genres', genresRouter);
app.use('/api/customers', customerRouter);
app.use('/api/movies', movieRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/register', userRouter);
app.use('/api/login', authRouter);


const PORT= process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Listening on..... ${PORT}`)})
