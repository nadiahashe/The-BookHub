// Queries:

// read single group: arg name, return group object
// read single discussion: arg discussion id, return discussion object


// Mutations:

// create group: arg groupname, leader, return group object; updates group array of "leader"
// create discussion: arg book, return discussion object; updates group's discussion array
// create comment: arg book, return discussion object; updates discussion's comment array

// update group (add member): arg groupname, username, return group object; updates user's group array

// import { Discussion, Group } from "../models/index.js"
// Imports
import { Book, User, Discussion, Group } from "../models/index.js";
import { signToken } from "../services/auth.js";
import bcrypt from 'bcrypt';

const resolvers = {
    Query: {
        // read logged-in user's books: arg (or context) username, return book array
        me: async (_parent: any, _arg: any, context: any) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate(['books', 'groups']);
            } else {
                throw new Error("Could not find user");
            }
        },
        // read single book: arg _id of book, return book object
        getBook: async (_parent: any, { getBookId }: any, _context: any) => {
            const book = await Book.findOne({ _id:getBookId });
            if (!book) {
                throw new Error("Book not found");
            }
            return book;
        },
        // read all reviews by book: arg bookId, return array of book objects where shared is true
        bookReviews: async (_parent: any, { bookId }: any, _context: any) => {
            const reviews = await Book.find({ bookId, "review.shared": true });
            if (!reviews) {
                throw new Error("Reviews not found");
            }
            return reviews;
        },
        // Get user profile data by ID
        getUser: async (_parent: any, { id }: any, _context: any) => {
                return await User.findById(id).populate(['books', 'groups']);
        },
        // read single group: arg name, return group object
        getClub: async (_parent: any, { id }: any) => {
            return await Group.findById(id).populate('users').populate(['discussions', 'users']);
        },
        // read single discussion: arg discussion id, return discussion object
        getDiscussion: async (_parent: any, { discussionId }: any) => {
            return await Discussion.find({ discussionId }).populate('comments');
        }
    },

    Mutation: {
        // login: arg email, password, returns Auth object (json token + user)
        login: async (_parent: any, { email, password }: any, _context: any) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Authentication failed");
            }
            const pwcheck = await bcrypt.compare(password, user.password);
            if (!pwcheck) {
                throw new Error("Authentication failed");
            }
            const token = signToken(user.username, user._id);
            return { token };
        },
        // create user (signup): arg username, password, email, returns Auth object (json token + user)
        signup: async (_parent: any, { email, password, username }: any, _context: any) => {
            const hashedpw = await bcrypt.hash(password, 10);
            const newUser = await User.create({ email, password: hashedpw, username });
            if (!newUser) {
                throw new Error('User signup failed');
            }
            const token = signToken(newUser.username, newUser._id);
            return { token };
        },
        // create book: arg title, author, image, bookId, return book object; updates logged-in user's book array
        addBook: async (_parent: any, { title, authors, image, bookId }: any, context: any) => {
            const newBook = await Book.create({ title, authors, image, bookId });
            if (!newBook) {
                throw new Error("Failed to add new book");
            }
            const updatedUser = await User.findOneAndUpdate(
                { username: context.user.username },
                { $addToSet: { books: newBook._id } },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error("Failed to update user");
            }
            return newBook;
        },
        // create/update review: arg content, progress, public, _id of book, _id of user (from context), return review object; updates book's review
        updateReview: async (_parent: any, { content, shared, _id }: any, context: any) => {
            const updatedBook = await Book.findOneAndUpdate(
                { _id },
                { $set: { "review.content": content, "review.shared": shared, "review.username": context.user.username } },
                { new: true }
            );
            if (!updatedBook) {
                throw new Error("Failed to update book");
            }
            return updatedBook;
        },
        // create group: arg groupname, leader, description, return group object; updates group array of "leader"
        createGroup: async (_parent: any, { groupname, leader, description }: any) => {
            const newGroup = await Group.create({ groupname, users: [leader], description });
            await User.findByIdAndUpdate(leader, { $addToSet: { groups: newGroup._id } });
            return newGroup;
        },
        // create discussion: arg book, return discussion object; updates group's discussion array
        createDiscussion: async (_parent: any, { groupId, title, authors, image, bookId }: any) => {
            const newDiscussion = await Discussion.create({ title, authors, image, bookId });
            await Group.findByIdAndUpdate(groupId, { $addToSet: { discussions: newDiscussion._id } });
            return newDiscussion;
        },
        // create comment: arg book, return discussion object; updates discussion's comment array
        createComment: async (_parent: any, { discussionId, content, username }: any) => {
            const newComment = { commentId: Date.now(), content, username };
            const discussion = await Discussion.findByIdAndUpdate(discussionId, { $push: { comments: newComment } }, {new: true});
            return discussion;
        },
        // update group (add member): arg group _id, username, return group object; updates user's group array
        addUserToGroup: async (_parent: any, { username, groupId }: any) => {
            const user = await User.findOne({username})
            if (user) {
                const group = await Group.findByIdAndUpdate(groupId, { $addToSet: { users: user._id } }, {new: true}).populate('users');
                await User.findByIdAndUpdate(user._id, { $addToSet: { groups: groupId } });
                return group
            }
            else {throw new Error("User not found")}
        },
        // update book progress
        updateProgress: async (_parent: any, { bookId, progress }: any) => {
            const book = await Book.findByIdAndUpdate(bookId, { progress }, { new: true });
            if (!book) {
                throw new Error("Failed to update book progress");
            }
            return book;
        },
        // read google book search: arg search string, return array of book objects
        bookSearch: async (_parent: any, { string }: any, _context: any) => {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${string}`);
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const { items } = await response.json();
            const books = items.map((book: any) => ({
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors || ["Unknown"],
                image: book.volumeInfo.imageLinks?.thumbnail || '',
                bookId: book.id,
            }));
            return books;
        }
    }
};

export default resolvers;
