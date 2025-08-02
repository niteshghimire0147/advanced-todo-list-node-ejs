const express = require("express");
const session = require("express-session");
// Middleware
module.exports = [
  express.urlencoded({ extended: false }),
  express.json(),
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  }),

  (req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
  },
];
