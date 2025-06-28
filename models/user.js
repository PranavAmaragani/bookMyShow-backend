const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50,
        required: true,
    },
    gender: {
        type: String,
        lowercase: true,
        validate(value) {
            const acceptedGenders = ["male", "female", "others"];
            if (!acceptedGenders.includes(value)) {
                throw new Error("Gender is not valid");
            }
        },
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email format");
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(
                    "password atleast have one upperase, special character and numeric value"
                );
            }
        },
    },
    age: {
        type: Number,
        required: true,
        min: 15,
    },


    role: {
        type: [String],
        required: true,
        enum: ["user", "admin"]

    }


});
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "BookMyShow@18", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByInput) {
  const user = this; //vinay
  const hashedPassword = user.password;
  const password = passwordByInput;
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
