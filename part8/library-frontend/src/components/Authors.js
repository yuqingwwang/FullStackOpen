import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS , EDIT_BIRTHYEAR } from "../queries";

const Authors = ({show, authors, setError}) => {
  const [name, setName] = useState("");
  const [setBornTo, setBornYear] = useState(1990);

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    onError: (error) => {
      if (error.graphQLErrors) {
      const errors = error.graphQLErrors[0]
      setError(errors)
      }
    },
    update: (cache, response) => {
      cache.updateQuery({query: ALL_AUTHORS}, ({allAuthors})=>{
        return {
          allAuthors: allAuthors.concat(response.data.editAuthor),
        }
      })
    }})

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo } });

    setName("");
    setBornYear("")

  };


  if (!show) {
    return null
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select onChange={({ target }) => setName(target.value)}>
          <option value="">
          --- select an author ---
          </option>
          {authors.map((a) =>
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          )}
          </select>
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
