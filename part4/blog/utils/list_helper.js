const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return  blogs.reduce((totalLikes, savedBlog) => totalLikes + savedBlog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}
