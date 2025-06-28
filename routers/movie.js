const express = require("express");
const movieRouter = express.Router();
const jwt = require("jsonwebtoken");
const Movie = require("../models/movies.js");
const {adminAuth} = require("../middlewares/isAdmin.js")
const { validateSignupData } = require("../utils/validate.js");






// Add movie route
movieRouter.post("/addMovies", adminAuth, async (req, res) => {
    try {
        const { movieName, city, capacity = 0, isFilled = false, eventType } = req.body;

        if (!movieName || !city) {
            return res.status(400).send("movieName and city are required");
        }

        const newMovie = new Movie({
            movieName,
            city,
            capacity,
            isFilled,
            eventType
        });

        await newMovie.save();

        res.status(201).send({ message: "Movie added successfully", movie: newMovie });
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

module.exports = movieRouter;
