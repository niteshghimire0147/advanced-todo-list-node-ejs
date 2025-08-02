require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});
app.use(express.static("public"));

// middleware

app.use(require("./middleware/index.js"));

// set template engine

app.set("view engine", "ejs");

// set route
app.use("", require("./routes/route"));

// server
app.listen(PORT, () => {
  console.log(`server started http://localhost:${PORT}`);
});
