const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})


describe('total likes, multiple blogs', () => {
  const blogs = [
    {
      title: 'Who am I',
      author: 'Bob',
      url: 'www.google.com',
      likes: 5,
    },
    {
      title: 'Who are you',
      author: 'Sam',
      url: 'www.google.com',
      likes: 20,
    },
    {
      title: 'I am Buzz',
      author: 'Buzz',
      url: 'www.google.com',
      likes: 2,
    }
  ]

  test('when list has more then one blog, return the sum of likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(27)
  })
})
