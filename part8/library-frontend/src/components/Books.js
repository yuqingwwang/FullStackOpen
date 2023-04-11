import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])

  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  });

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
      setGenres([...new Set(bookResult.data.allBooks
        .map((b) => b.genres)
        .flat()
        .filter((genre) => genre !== '')),
        'all genres'])
    }
  }, [bookResult.data]);

  if (bookResult.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }


  const filteredBooks = genre ? books.filter((book) => book.genres.includes(genre)) : books;

  return (
    <div>
      <h2>books</h2>
      <div>in genre <b>{genre}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => {
  return (
    <button key={genre} onClick={() => {
      if (genre==='all genres'){
        setGenre(null)} else{
      setGenre(genre)}
    }}>
      {genre}
    </button>
  );
})}
    </div>
  )
}

export default Books
