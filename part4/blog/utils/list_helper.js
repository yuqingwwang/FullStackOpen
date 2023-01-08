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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
