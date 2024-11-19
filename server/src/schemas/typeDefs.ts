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
    progress: Int
}

type Review {
    content: String
    username: String
    shared: Boolean
    reviewId: String!
}

type Group {
    _id: ID
    groupname: String!
    users: [User]
    discussions: [Discussion]
    description: String
}

type Discussion {
    _id: ID
    title: String!
    authors: [String]
    image: String
    comments: [Comment]
    bookId: String!
}

type Comment {
    commentId: String!
    content: String!
    username: String!
}

type Auth {
    token: String
}

type Query {
    me: User
    getUser(id: ID!): User
    getBook(getBookId: ID!): Book
    bookReviews(bookId: String!): [Book]
    getClub(id: ID!): Group
    getDiscussion(discussionId: ID!): [Discussion]
}

type Mutation {
    login(email: String!, password: String!): Auth
    signup(email: String!, password: String!, username: String!): Auth
    addBook(title: String!, authors: [String], image: String, bookId: String): Book
    updateReview(content: String, shared: Boolean, _id: ID!): Book
    createGroup(groupname: String!, leader: ID!, description: String): Group
    createDiscussion(groupId: ID!, title: String!, authors: [String], image: String, bookId: String): Discussion
    createComment(disussionId: ID!, content: String, username: String): Discussion
    updateProgress(bookId: ID!, progress: Int!): Book
    addUserToGroup(username: String!, groupId: ID!): Group
    bookSearch(string: String!): [Book]
}


`

export default typeDefs
