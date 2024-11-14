// discussions will contains a book and an array of comments
// comments will be a subdocument that contains an id, content, and a username string

import { Schema, model, Document, Types, ObjectId } from "mongoose";

interface IComment extends Document {
    commentId: Schema.Types.ObjectId;
    content: String;
    username: String;
}

interface IDiscussion extends Document {
    book: ObjectId;
    comments: Schema.Types.ObjectId[];
}

const commentSchema =  new Schema<IComment>(
    {
        commentId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
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
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        comments: {
            type: [commentSchema]
        }
    }
)

export const Discussion = model('Discussion', discussionSchema)