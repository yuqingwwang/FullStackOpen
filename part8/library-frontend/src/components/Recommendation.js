import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const FavouriteBooks = ({ show, user }) => {
  const [books, setBooks] = useState([])
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre: user.favoriteGenre },
  })

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  const allGenres = books.map(book => book.genre);
  const uniqueGenres = [...new Set(allGenres)];

  if (!uniqueGenres.includes(user.favoriteGenre)) {
    const filteredBooks = books
  }
  const filteredBooks = books.filter((book) => book.genres.includes(user.favoriteGenre))


  if (loading) {
    return <div>Loading...</div>
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Books by favourite genre ({user.favoriteGenre})</h2>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author.name}
          </li>
        ))}
      </ul>
    </div>
  )
}


export default FavouriteBooks
