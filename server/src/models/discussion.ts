// discussions will contains a book and an array of comments
// comments will be a subdocument that contains an id, content, and a username string

import { Schema, model, Document, ObjectId } from "mongoose";

export interface IComment extends Document {
    commentId: Schema.Types.ObjectId;
    content: String;
    username: String;
}

export interface IDiscussion extends Document {
    title: string;
    authors: string[];
    image: string;
    comments: Schema.Types.ObjectId[];
    bookId: string;
    groupId: ObjectId;
}

const commentSchema =  new Schema<IComment>(
    {
        commentId: {
            type: Date,
        },
        content: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }
)

const discussionSchema = new Schema<IDiscussion>(
    {
        title: {
            type: String,
            required: true
        },
        authors: {
            type: [String]
        },
        image: {
            type: String
        },
        comments: {
            type: [commentSchema]
        },
        bookId: {
            type: String,
            required: true
        },
        groupId: {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    }
)

export const Discussion = model('Discussion', discussionSchema)