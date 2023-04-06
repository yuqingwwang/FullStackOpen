import { useState } from "react";
import { useMutation , useQuery } from "@apollo/client";

import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const Authors = ({show, setError }) => {
  const [name, setName] = useState("");
  const [born, setBornYear] = useState("");

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    onError: (error) => {
      if (error.graphQLErrors) {
      const errors = error.graphQLErrors[0]
        if (errors){
          setError(errors.message)
        }
      }
    }
  })

  const { loading, error, data } = useQuery(ALL_AUTHORS, { pollInterval: 2000 });

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault();

    await editAuthor({ variables: { name, born } });

    setName("");
    setBornYear("");

  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const authors = data.allAuthors;


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
            type="number"
            value={born}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
