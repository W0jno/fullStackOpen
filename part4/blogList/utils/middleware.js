const logger = require("./logger.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  logger.error(error.message);
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get("authorization");

  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    request["token"] = authHeader.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  request["user"] = user;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
