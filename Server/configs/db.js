//This is Configuration file used for connect to database to server by mongoose;
const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.dbURL);
// const connection = mongoose.connect("mongodb://localhost:27017/test")
module.exports = { connection };
