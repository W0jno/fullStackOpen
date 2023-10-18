const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const noteObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = noteObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET);
  return token;
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

    const freshUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };
    freshUser.token = generateToken(freshUser);
    await api
      .post("/api/users")
      .send(freshUser)
      .set("Authorization", `Bearer ${freshUser.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(freshUser.username);
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };
    newUser.token = generateToken(newUser);

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

//BLOGS
describe("addition of a new blog", () => {
  let header;
  beforeEach(async () => {
    const newUser = {
      username: "root",
      name: "root",
      password: "password",
    };

    await api.post("/api/users").send(newUser);

    const result = await api.post("/api/login").send(newUser);

    header = {
      Authorization: `bearer ${result.body.token}`,
    };
  });
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .set(header)
      .expect("Content-Type", /application\/json/);
  });
  test("unique identifier property of the blog posts is named id", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .set(header)
      .expect("Content-Type", /application\/json/);
  });

  test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
    newBlog = {
      title: "dupa",
      author: "Filip",
      url: "https://www.google.com",
      likes: 41,
    };
    const totalBlogs = await Blog.find({}).countDocuments();

    await api.post("/api/blogs").send(newBlog).expect(200).set(header);

    expect(totalBlogs + 1).toBe(await Blog.find({}).countDocuments());
    expect(newBlog.title).toBeDefined();
  });

  test("add like property if missing", async () => {
    const blogWithoutLikes = {
      title: "dupa",
      author: "Filip",
      url: "https://www.google.com",
    };
    const res = await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .expect(200)
      .set(header)
      .expect("Content-Type", /application\/json/);

    expect(res.body.likes).toBe(0);
    console.log("body", res.body);
  }, 10000);

  test("verify that if the title or url properties are missing from the request data", async () => {
    const blogWithoutTitleOrUrl = {
      author: "Filip",
      url: "https://www.google.com",
      likes: 41,
    };

    await api
      .post("/api/blogs")
      .send(blogWithoutTitleOrUrl)
      .expect(400)
      .set(header);
  });

  test("adding a blog fails with the proper status code 401 Unauthorized if a token is not provided", async () => {
    newBlog = {
      title: "dupa",
      author: "Filip",
      url: "https://www.google.com",
      likes: 41,
    };
    const blogWithoutToken = newBlog;

    await api.post("/api/blogs").send(blogWithoutToken).expect(401);
  });
});

describe("deletion of a blog", () => {
  test("HTTP DELETE request to the /api/blogs/:id URL successfully deletes a blog post", async () => {
    const blogToDelete = await Blog.findOne({});
    await api
      .delete("/api/blogs/" + blogToDelete.id)
      .expect(200)
      .set(header);
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
      .expect(200)
      .set(header);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
