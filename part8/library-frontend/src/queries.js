import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    published
    id
    genres
    author {
      name
    }
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`

// export const FIND_BOOK = gql`
//   query findBookByName($titleToSearch: String!) {
//     findBook(name: $titleToSearch) {
//       title,
//       published,
//       author
//       id
//       genres
//     }
//   }
// `

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]
    ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`
export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
