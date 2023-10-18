const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

/* const getTokenFrom = (req) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}; */

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = request.user;
  if (!decodedToken) {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const createdBy = await Blog.findById(request.params.id);
  const decodedToken = request.user;

  if (createdBy.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.send("deleted");
  } else {
    return response.status(401).json({ error: "unauthorized access" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(blog);
});

module.exports = blogsRouter;
