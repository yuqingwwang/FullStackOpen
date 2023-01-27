import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PostForm from './PostForm'
import userEvent from '@testing-library/user-event'


test('creating new blogs with correct details', async () => {
  const handleNewBlog = jest.fn()

  render(
    <PostForm
      handleNewBlog={handleNewBlog}
    />
  )

  const user = userEvent.setup()

  const title = screen.getByPlaceholderText('title')
  await userEvent.type(title, 'blog title')
  const author = screen.getByPlaceholderText('author')
  await userEvent.type(author, 'blog author')
  const url = screen.getByPlaceholderText('url')
  await userEvent.type(url, 'blog url')

  const Button = screen.getByText('create')
  await user.click(Button)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0].title).toBe('blog title')
  expect(handleNewBlog.mock.calls[0][0].author).toBe('blog author')
  expect(handleNewBlog.mock.calls[0][0].url).toBe('blog url')
})
