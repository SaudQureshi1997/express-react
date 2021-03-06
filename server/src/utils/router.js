import { Router } from "express";
import logger from "../utils/logger.js";

const router = Router();

const prependSlash = (path) => {
  path = path.trim("/");
  return "/".concat(path);
};

const addCustomMethodsToResponse = (res) => {
  res.validationError = (errors) => {
    res.status(422).json({errors, message: 'Invalid inputs'});
  }
  res.unauthorized = (message) => {
    res.status(401).json({message: message || 'You are not allowed to access this resource'});
  }
  res.notfound = (message) => {
    res.status(404).json({message: message || 'Resource you are trying to access does not exist'});
  }
  return res;
}

const registerRoute = (method, path, callback, middlewares) => {
  path = prependSlash(path);
  router[method](path, ...middlewares, (req, res, next) => {
    res = addCustomMethodsToResponse(res);
    return callback({ req, res, next, logger });
  });
};

const post = (path, callback, middlewares = []) =>
  registerRoute("post", path, callback, middlewares);

const get = (path, callback, middlewares = []) =>
  registerRoute("get", path, callback, middlewares);

const put = (path, callback, middlewares = []) =>
  registerRoute("put", path, callback, middlewares);

const patch = (path, callback, middlewares = []) =>
  registerRoute("patch", path, callback, middlewares);

const _delete = (path, callback, middlewares = []) =>
  registerRoute("delete", path, callback, middlewares);

export { router, post, get, put, patch, _delete };
