const listHelper = require("../utils/list_helper");

describe("author with most blogs", () => {
  const blogs = [
    {
      title: "Who am I",
      author: "Bob",
      url: "www.google.com",
      likes: 5,
    },
    {
      title: "Who are you",
      author: "Bob",
      url: "www.google.com",
      likes: 20,
    },
    {
      title: "I am Buzz",
      author: "Buzz",
      url: "www.google.com",
      likes: 2,
    },
  ];

  test("return the author name and number of blogs", () => {
    const result = listHelper.mostBlogs(blogs);

    const ans = {
      author: "Bob",
      blogs: 2,
    };
    expect(result).toEqual(ans);
  });
});
