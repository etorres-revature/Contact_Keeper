const express = require("express");
const logger = require("morgan");
const connectDB = require("./db");
const compression = require("compression");
const path = require("path");

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

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`Your app is now listening at http://localhost:${PORT}`)
);
