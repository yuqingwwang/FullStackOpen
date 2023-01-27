import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  'title': 'i wonder why',
  'author': 'tom jacobs',
  'url': 'www.hahahha.com',
  'likes': 46,
  'user': {
    'username': 'mluukai',
    'id': '63c88b8f41048959272e8988'
  },
  'id': '63c8935cc3f8c24dbb4b7c74'
}

test('renders title and author', () => {

  render(
    <Blog
      blog={blog}
    />)

  const input = screen.getByPlaceholderText('default')


  expect(input).toHaveTextContent('i wonder why')

  expect(input).toHaveTextContent('tom jacobs')

  expect(input).not.toHaveTextContent('www.hahahha.com')

  expect(input).not.toHaveTextContent(46)
})

test('shows likes and url when clicked', async () => {
  const container = render(
    <Blog
      blog={blog}
    />).container

  const user = userEvent.setup()
  const button = screen.getByText('View')

  await user.click(button)

  expect(container).toHaveTextContent('www.hahahha.com')
  expect(container).toHaveTextContent(46)
})

test('liked twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
    />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
