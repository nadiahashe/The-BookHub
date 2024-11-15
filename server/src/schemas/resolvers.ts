// Queries:

// read single group: arg name, return group object
// read single discussion: arg discussion id, return discussion object


// Mutations:

// create group: arg groupname, leader, return group object; updates group array of "leader"
// create discussion: arg book, return discussion object; updates group's discussion array
// create comment: arg book, return discussion object; updates discussion's comment array

// update group (add member): arg groupname, username, return group object; updates user's group array

// import { Discussion, Group } from "../models/index.js"
import { Book, User } from "../models/index.js"
import { signToken } from "../services/auth.js"
import bcrypt from 'bcrypt'

const resolvers = {
    Query: {
// read logged-in user's books: arg (or context) username, return book array
        me: async (_parent: any, _arg: any, context: any) => {
                
                if (context.user) {
                        return await User.findOne({_id:context.user._id}).populate(['books', 'groups'])
                }
                else {
                        throw new Error("Could not find user")
                }
        },
// read single book: arg _id of book, return book object"
        getBook: async (_parent: any, {_id}: any, _context: any) => {
                const book = await Book.findOne({_id})
                if (!book) {
                        throw new Error("Book not found")
                }
                return book
        },
// read all reviews by book: arg bookId, return array of book objects where shared is true
        bookReviews: async (_parent: any, {bookId}: any, _context: any) => {
                const reviews = await Book.find({bookId, "review.shared": true})
                if (!reviews) {
                        throw new Error("Reviews not found")
                }
                return reviews
        },
// read google book search: arg search string, return array of book objects
        bookSearch: async (_parent: any, {string}: any, _context: any) => {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${string}`)
                if (!response.ok) { 
                        throw new Error("Failed to fetch")

                }
                const {items} = await response.json()
                const books = items.map((book: any)=>({
                        title: book.volumeInfo.title,
                        authors: book.volumeInfo.authors || ["Unknown"],
                        image: book.volumeInfo.imageLinks?.thumbnail || '',
                        bookId: book.id,
                }))
                return books
        },
    },
    Mutation: {
// login: arg email, password, returns Auth object (json token + user)
        login: async (_parent: any, {email, password}: any, _context: any) => {
                const user = await User.findOne({email})
                if (!user) {
                        throw new Error("Authentication failed")
                }
                const pwcheck = await bcrypt.compare(password, user.password)
                if (!pwcheck) {
                        throw new Error("Authentication failed")
                }
                const token = signToken(user.username, user._id)
                return {token}                
        },
// create user (signup): arg username, password, email, returns Auth object (json token + user)
        signup: async (_parent: any, {email, password, username}: any, _context: any) => {
                const hashedpw = await bcrypt.hash(password, 10)
                const newUser = await User.create({email, password: hashedpw, username})
                if (!newUser) { 
                        throw new Error('User signup failed')
                }
                const token = signToken(newUser.username, newUser._id)
                return {token} 
        },
// create book: arg title, author, image, bookId, return book object; updates logged-in user's book array
        addBook: async (_parent: any, {title, authors, image, bookId}: any, context: any) => {
                const newBook = await Book.create({title, authors, image, bookId})
                if (!newBook) {
                        throw new Error("Failed to add new book")
                }
                const updatedUser = await User.findOneAndUpdate(
                        {username: context.user.username},
                        {$addToSet: {books: newBook._id}},
                        {new:true})
                if (!updatedUser) {
                        throw new Error("Failed to update user")
                }
                return newBook

        },
// create/update review: arg content, progress, public, _id of book, _id of user (from context), return review object; updates book's review
        updateReview: async (_parent: any, {content, progress, shared, _id}: any, context: any) => {
                const updatedBook = await Book.findOneAndUpdate(
                        {_id},
                        {$set: {"review.content": content, "review.progress": progress, "review.shared": shared, "review.username": context.user.username}},
                        {new: true}
                )
                if (!updatedBook) {
                        throw new Error("Failed to update book")
                }
                return updatedBook
        },
    }
}

export default resolvers
