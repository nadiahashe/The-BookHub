const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    books: [Book]
    groups: [Group]
}

type Book {
    _id: ID
    title: String!
    authors: [String]
    image: String
    bookId: String
    review: Review
}

type Review {
    content: String
    username: User
    progress: String
    shared: Boolean
}

type Group {
    _id: ID
    groupname: String!
    users: [User]
    discussions: [Discussion]
}

type Discussion {
    _id: ID
    book: Book
    comments: [Comment]
}

type Comment {
    commentId: String!
    content: String!
    username: String!
}

type Auth {
    token: String
    user: User
}

type Query {
    me: User
    getBook(_id: ID!): Book
    bookReviews(bookId: String!): [Book]
    bookSearch(string: String!): [Book]
}

type Mutation {
    login(email: String!, password: String!): Auth
    signup(email: String!, password: String!, username: String!): Auth
    addBook(title: String!, authors: [String], image: String, bookId: String): Book
    updateReview(content: String, progress: String, shared: Boolean, _id: ID!): Book
}


`

export default typeDefs
