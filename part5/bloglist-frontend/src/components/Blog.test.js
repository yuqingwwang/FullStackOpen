import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  // const mockHandler = jest.fn()

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

  // const blog ={
  //   title: 'i wonder why',
  //   author: 'tom jacobs',
  //   url: mockHandler,
  //   likes: mockHandler,
  //   user: mockHandler,
  //   id: mockHandler
  // }

  const component = render(
    <Blog
      blog={blog}
    />)

  expect(component.container).toHaveTextContent('i wonder why')

  expect(component.container).toHaveTextContent('tom jacobs')
})
