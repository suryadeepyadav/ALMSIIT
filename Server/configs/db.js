//This is Configuration file used for connect to database to server by mongoose;
const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.dbURL);
// const connection = mongoose.connect("mongodb+srv://suryadeepyadav:<surya@1012@>@cluster0.ycu6uss.mongodb.net/?retryWrites=true&w=majority")
module.exports = { connection };
