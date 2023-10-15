const logger = require("./logger.js");

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
  const authHeader = request.get("Authorization");

  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    request["token"] = authHeader.substring(7);
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };
