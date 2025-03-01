const rateLimit = require("express-rate-limit");

exports.appoimentlimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (15 min)
  message: "Too many requests, please try again later.",
  headers: false, // Send RateLimit headers in the response
});
