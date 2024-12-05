const mongoose = require("mongoose")

async function connectDB(){
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("Database Successfull connected");
    console.log(`${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB


