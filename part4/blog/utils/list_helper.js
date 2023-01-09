var _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return  blogs.reduce(
    (totalLikes, savedBlog) => totalLikes + savedBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (favorite, savedBlog) => favorite = favorite.likes > savedBlog.likes ? favorite : savedBlog, 0)
  return {
    'title': favorite.title,
    'author': favorite.author,
    'url': favorite.url,
    'likes': favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = {}
  const popularAuthor = {
    author: '',
    blogs: 0
  }

  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
  })

  for (const [author, blogs] of Object.entries(authors)) {
    if (blogs > popularAuthor.blogs) {
      popularAuthor.author = author
      popularAuthor.blogs = blogs
    }
  }

  return popularAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
