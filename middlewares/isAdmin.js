const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const adminAuth = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Please Login!")
        }
        const decodedObj = jwt.verify(token, "BookMyShow@18");

        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("No User Found!")
        };

        if (!user.role.includes("admin")) {
            return res.status(403).send("Access denied. Admins only.");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Error!" + err.message)
    }
}


module.exports = { adminAuth }