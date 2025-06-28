const express = require("express");
const userRouter = express.Router();
const Movie = require("../models/movies");
const { userAuth } = require("../middlewares/auth");



// Get all movies and events
userRouter.get("/all", userAuth, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});


userRouter.get("/movies", userAuth, async (req, res) => {
    try {
        const movies = await Movie.find({ eventType: { $in: ["movie"] } });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

userRouter.get("/shows", userAuth, async (req, res) => {
    try {
        const movies = await Movie.find({ eventType: { $in: ["show"] } });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});



module.exports = userRouter;
