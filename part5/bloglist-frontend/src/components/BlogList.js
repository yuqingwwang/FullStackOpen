import React from 'react'

import Blog from './Blog'

const BlogList = ({
  blogs,
  byLikes,
  handleLike,
  handleDelete,
  loggedUser
}) => (
  <div>
    {blogs.sort(byLikes).map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        handleDelete={() => handleDelete(blog)}
        handleLike={() => handleLike(blog)}
        loggedUser={loggedUser}
      />
    ))}
  </div>
)

export default BlogList
