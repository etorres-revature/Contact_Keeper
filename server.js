const express = require("express");
const connectDB = require("./config/db");
const logger = require("morgan");
const compression = require("compression");

const PORT = process.env.PORT || 34825;

const app = express();

//connect to MongoDB
connectDB();

//init middleware
app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ msg: "welcome to the contact keeper API" });
});

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contacts"));

app.listen(PORT, () =>
  console.log(`Your app is now listening at http://localhost:${PORT}`)
);
