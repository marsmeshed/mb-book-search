import {gql} from "@apollo/client";

export const GET_SINGLE_USER =  gql`
query getSingleUser {
    getSingleUser {
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`