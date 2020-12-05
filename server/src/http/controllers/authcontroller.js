import User from "@models/user.js";
import Validator from "@utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async ({ req, res, logger }) => {
  const errors = await Validator(req.body, {
    email: "required|email|unique:user,email",
    password: "required|string|minLength:8",
    name: "required|string",
  });

  if (errors) {
    return res.validationError(errors);
  }

  const user = await User.create(req.body);

  const token = jwt.sign({ data: user.tokenPayload() }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "3h",
  });

  return res.json({
    token,
  });
};

export const login = async ({ req, res }) => {
  const errors = await Validator(req.body, {
    email: "required|email|exists:user,email",
    password: "required|string|minLength:8"
  });

  if (errors) {
    return res.validationError(errors);
  }

  const user = await User.findOne({email: req.body.email});
  const check = bcrypt.compareSync(req.body.password, user.password);

  if (!check) {
    return res.validationError({password: ['password does not match.']});
  }

  const token = jwt.sign({ data: user.tokenPayload() }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "3h",
  });

  return res.json({ token });
};

export const me = ({ req, res }) => {
  return res.json(req.user.data);
};
