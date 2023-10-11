const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");

const api = supertest(app);
newBlog = {
  title: "dupa",
  author: "Filip",
  url: "https://www.google.com",
  likes: 41,
};
describe("when there is initially some notes saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
test("unique identifier property of the blog posts is named id", async () => {
  const blogs = await Blog.find({});
  expect(blogs[0].id).toBeDefined();
});

test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
  const totalBlogs = await Blog.find({}).countDocuments();
  await api.post("/api/blogs").send({ newBlog }).expect(200);

  expect(totalBlogs + 1).toBe(await blog.find({}).countDocuments());
  expect(newBlog.title).toBeDefined();
});

test("add like property if missing", async () => {
  const blogWithoutLikes = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
  };
  const res = await api
    .post("/api/blogs")
    .send(blogWithoutLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(res.body.likes).toBe(0);
  console.log("body", res.body);
}, 10000);

test("verify that if the title or url properties are missing from the request data", async () => {
  const blogWithoutTitleOrUrl = {
    author: newBlog.author,
    url: newBlog.url,
    likes: 12,
  };

  await api.post("/api/blogs").send(blogWithoutTitleOrUrl).expect(400);
});

describe("deletion of a blog", () => {
  test("HTTP DELETE request to the /api/blogs/:id URL successfully deletes a blog post", async () => {
    const blogToDelete = await Blog.findOne({});
    await api.delete("/api/blogs/" + blogToDelete.id).expect(200);
  });
});

describe("update of a blog", () => {
  test("HTTP PUT request to the /api/blogs/:id URL successfully updates a blog post", async () => {
    const blogToUpdate = await Blog.findOne({});
    const update = {
      title: "new title",
      author: "new author",
      url: "new url",
    };
    await api
      .put("/api/blogs/" + blogToUpdate.id)
      .send(update)
      .expect(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
