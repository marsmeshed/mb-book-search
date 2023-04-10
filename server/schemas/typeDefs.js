const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        getSingleUser: User
    }

    input bookSaved {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth

        login(email: String!, password: String!): Auth

        saveBook(bookSaved: bookSaved): User

        deleteBook(bookId: String!): User
    }
`

module.exports = typeDefs;