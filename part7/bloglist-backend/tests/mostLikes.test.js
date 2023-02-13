const listHelper = require("../utils/list_helper");

describe("author with most likes", () => {
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

  test("return the author name and number of likes", () => {
    const result = listHelper.mostLikes(blogs);

    const ans = {
      author: "Bob",
      likes: 25,
    };
    expect(result).toEqual(ans);
  });
});
