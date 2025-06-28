const validator = require("validator");
const bcrypt = require("bcrypt");


const validateSignupData = (req) => {
  const {
    firstName,
    lastName,
    gender,
    emailId,
    password,
    age,
    userName,
    skills,
    about,
    photoURL,
  } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is invalid");
  }

  if (age < 15) {
    throw new Error("You are too young!");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("your emailId format is not valid!!");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong Password");
  }

 
};
module.exports = {validateSignupData}