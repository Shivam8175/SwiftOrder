import rateLimit from "express-rate-limit";
module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, try again later.",
});
