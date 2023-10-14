const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);
newBlog = {
  title: "dupa",
  author: "Filip",
  url: "https://www.google.com",
  likes: 41,
};

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if username is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "du",
      name: "Superuser",
      password: "<PASSWORD>",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "expected `username` to be at least 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

test("creation fails with proper statuscode and message if password too short", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "root",
    name: "Superuser",
    password: "pa",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain(
    "expected `password` to be at least 3 characters"
  );

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
});
describe("when there is initially some notes saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

//BLOGS
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
