const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const config = require("../utils/config.js");
const logger = require("../utils/logger.js");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 3 },
  author: { type: String, required: true },
  url: { type: String, required: true, minLength: 3 },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
blogSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Blog", blogSchema);
