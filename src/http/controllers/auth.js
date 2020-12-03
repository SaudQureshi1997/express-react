import User from "@models/user.js";
import Validator from '@utils/Validator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async ({ req, res, logger}) => {
  const errors = await Validator(req.body, {
    email: "required|email|unique:user,email",
    password: 'required|string|minLength:8',
    name: 'required|string'
  });

  if (errors) {
    return res.validationError(errors);
  }

  const password = bcrypt.hashSync(req.body.password, 10);
  
  const user = User.create({
    email: req.body.email,
    name: req.body.name,
    password,
  });

  const token = jwt.sign({data: user}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '3h'});
  
  return res.json({
    token,
  });
};
