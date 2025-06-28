const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routers/auth.js");
const movieRouter = require("./routers/movie.js");
const userRouter = require("./routers/users.js");
const { searchRouter } = require("./routers/search.js");
const { bookRouter } = require("./routers/bookTickets.js");

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", authRouter);
app.use("/", movieRouter)
app.use("/",userRouter)
app.use("/",searchRouter)
app.use("/",bookRouter)
app.get("/", (req, res) => {
    res.send("app is running")
})
//connecting to Database
connectDB()
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(3000, () => {
            console.log("App is listening on 3000 port");
        });
    })
    .catch((err) => {
        console.log("ERROR" + err.message);
    });
