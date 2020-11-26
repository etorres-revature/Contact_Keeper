const express = require("express");

const app = express();

const PORT = process.env.PORT || 34825;

app.listen(
  PORT,
  () => console.log(`Your app is now listening at http://localhost:${PORT}`)
);
