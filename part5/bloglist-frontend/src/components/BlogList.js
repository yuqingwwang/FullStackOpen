import React from 'react'

import Blog from './Blog'

const BlogList = ({
  blogs,
  byLikes,
  handleLike
}) => (
  <div>
    {blogs.sort(byLikes).map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={() => handleLike(blog)}
      />
    ))}
  </div>
)

export default BlogList
