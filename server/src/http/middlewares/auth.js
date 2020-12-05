import jwt from "express-jwt";

export default [
  jwt(
    {
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"]
    },
  ),
  function (err, req, res, next) {
    res.status(401).json({error: err.message});
  }
];