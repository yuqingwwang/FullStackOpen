const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const helper = require("./test_helper");
const bcrypt = require("bcrypt");

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("salainen", 10);
    const user = new User({
      username: "mluukai",
      passwordHash,
    });

    await user.save();
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 1000);

  describe("addition of a new note", () => {
    test("succeeds with valid data", async () => {
      const user = {
        username: "mluukai",
        password: "salainen",
      };

      const loginUser = await api.post("/api/login").send(user);

      const headers = {
        Authorization: `bearer ${loginUser.body.token}`,
      };

      const newBlog = {
        title: "Hey",
        author: "John",
        url: "www.google.com",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .set(headers)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((n) => n.title);
      expect(titles).toContain("Hey");
    }, 1000);
  });

  test("likes not missing", async () => {
    const response = await api.get("/api/blogs");

    const likes = response.body.map((r) => r.likes);

    expect(likes).toEqual(expect.not.stringContaining("0"));
  }, 1000);

  test("fails with status code 400 if data invalid", async () => {
    const user = {
      username: "mluukai",
      password: "salainen",
    };

    const loginUser = await api.post("/api/login").send(user);

    const headers = {
      Authorization: `bearer ${loginUser.body.token}`,
    };
    const newBlog = {
      author: "John",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(400).set(headers);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  }, 1000);

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const user = {
        username: "mluukai",
        password: "salainen",
      };

      const loginUser = await api.post("/api/login").send(user);

      const headers = {
        Authorization: `bearer ${loginUser.body.token}`,
      };

      const newBlog = {
        title: "Hey",
        author: "John",
        url: "www.google.com",
        likes: 10,
      };

      await api.post("/api/blogs").send(newBlog).set(headers);

      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[1];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        .set(headers);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

      const title = blogsAtEnd.map((r) => r.title);

      expect(title).not.toContain(blogToDelete.title);
    });
  });

  test("updating the blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const newBlog = {
      title: "Hello",
      url: "www.wikipedia.com",
      likes: 200,
      id: blogToUpdate.id,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  }, 1000);
});

afterAll(() => {
  mongoose.connection.close();
});
