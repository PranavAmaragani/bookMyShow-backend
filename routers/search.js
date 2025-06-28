const express = require("express");
const searchRouter = express.Router();
const Movie = require("../models/movies");
const { userAuth } = require("../middlewares/auth");

searchRouter.get("/search/city/:cityName", userAuth, async (req, res) => {
    try {
        const { cityName } = req.params;
        const events = await Movie.find({
            city: cityName
        })
        if(!events){
            res.status(400).json(
                {
                    message : `${events} not exists`
                }
            )
        }
        res.status(200).json(
            {
                message : "Events Fetched Successfully!!",
                data : events
            }
        )
    } catch (err) {
         res.status(400).json({ error: err.message });
    }
})


searchRouter.get("/search/movie/:name", userAuth, async (req, res) => {
    try {
        const { name } = req.params;
        const events = await Movie.find({
            movieName: name
        })
        if(!events){
            res.status(400).json(
                {
                    message : `${events} not exists`
                }
            )
        }
        
        res.status(200).json(
            {
                message : `Data Fetched Successfully!!`,
                data : events
            }
        )
    } catch (err) {
         res.status(400).json({ error: err.message });
    }
})
module.exports = {searchRouter};