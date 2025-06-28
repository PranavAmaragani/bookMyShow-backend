const mongoose = require("mongoose");
const { isLowercase } = require("validator");
const moviesSchema = mongoose.Schema({
    movieName : {
        type: String,
        required:true,
        
    },
    city : {
        type : String,
        required : true
    },
    capacity : {
        type : Number,
        default: 0,
        min: 0,
        max : 20
    },
    isFilled : {
        type : Boolean,
        default : false
    },
    eventType : {
        type : [String],
        required : true,
        enum : ["movie","show"]
    }
})
const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;
