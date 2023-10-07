const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const { errorHandler } = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(errorHandler);
const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
