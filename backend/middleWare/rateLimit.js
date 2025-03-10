const rateLimit = require("express-rate-limit");

exports.appoimentlimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // Each user can make 50 requests per window
  keyGenerator: (req) => req.id || req.ip, // Use User ID, fallback to IP
  message: "Too many requests from this user, please try again later.",
  headers: false, // Send RateLimit headers in the response
});
