const mongoose = require("mongoose");
const db = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Your app is connected to MongoDB"))
    .catch((err) => {
      console.err(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
