// routes/book.js
const express = require("express");
const bookRouter = express.Router();
const Movie = require("../models/movies");
const Ticket = require("../models/tickets");
const { userAuth } = require("../middlewares/auth");


// booking ticket api
bookRouter.post("/book/:movieId", userAuth, async (req, res) => {
    try {
        const { movieId } = req.params;
        const { seatNumber } = req.body;
        const userId = req.user._id;

        if (!seatNumber || seatNumber < 1 || seatNumber > 20) {
            return res.status(400).json({ message: "Invalid seat number." });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (movie.isFilled || movie.capacity === 0) {
            return res.status(400).json({ message: "Housefull! No tickets available." });
        }

        // Check if seat is already booked for this movie
        const existingSeat = await Ticket.findOne({ movieId, seatNumber });
        if (existingSeat) {
            return res.status(409).json({ message: `Seat number ${seatNumber} already booked.` });
        }

        // Book the seat
        movie.capacity -= 1;
        if (movie.capacity === 0) movie.isFilled = true;
        await movie.save();

        const ticket = new Ticket({
            userId,
            movieId,
            seatNumber
        });

        await ticket.save();

        res.status(200).json({
            userId: userId,
            message: "Ticket booked successfully!",
            seatNumber: ticket.seatNumber,
            ticketId: ticket._id,
            movieName: movie.movieName,
            city: movie.city,
            bookedAt: ticket.createdAt
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = { bookRouter };

//get booking history
bookRouter.get("/tickets-history", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
         const history = await Ticket.find({ userId }).populate("movieId", "movieName city") 
        res.status(200).json({
            message: "your ticket history is:",
            data: history
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})