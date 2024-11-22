const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    books: [Book]
    groups: [Group]
    invitations: [Group]
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
    _id: ID
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
    getUser(getUserId: ID!): User
    getBook(getBookId: ID!): Book
    bookReviews(bookId: String!): [Book]
    getClub(clubId: ID!): Group
    getDiscussion(discussionId: ID!): Discussion
}

type Mutation {
    login(email: String!, password: String!): Auth
    signup(email: String!, password: String!, username: String!): Auth
    addBook(title: String!, authors: [String], image: String, bookId: String): Book
    updateReview(content: String, shared: Boolean, id: ID!): Book
    createGroup(groupname: String!, description: String): Group
    createDiscussion(groupId: ID!, title: String!, authors: [String], image: String, bookId: String): Discussion
    createComment(discussionId: ID!, content: String, username: String): Discussion
    updateProgress(bookId: ID!, progress: Int!): Book
    bookSearch(string: String!): [Book]
    removeUserFromGroup(groupId: ID!): Group
    addUserToGroup(groupId: ID!, accepted: Boolean!): User
    inviteUserToGroup(username: String!, groupId: ID!): String
}


`

export default typeDefs
