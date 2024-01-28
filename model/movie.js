const Joi = require('joi');
const mongoose = require('mongoose');
const { schema } = require('../model/genre')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: schema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    }
})

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(225).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(225).required()
    }) 
    return schema.validate(movie)
}

exports.Movie = Movie;
exports.validate = validateMovie;