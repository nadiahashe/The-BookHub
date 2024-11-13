// a group will contain a name, an array of users, and an array of discussions
// discussions will be a subdocument that contains an id, a book, and an array of comments
// comments will be a subdocument that contains an id, content, and a username string

import { Schema, model, Document, Types, ObjectId } from "mongoose";

interface IComment extends Document {
    commentID: Schema.Types.ObjectId,
    content: String,
    username: String
}

interface IDiscussion extends Document {
    discussionID: Schema.Types.ObjectId,
    book: ObjectId,
    comments: Schema.Types.ObjectId[]
}

interface IGroup extends Document {
    name: string,
    users: ObjectId[],
    discussions: Schema.Types.ObjectId[]
}

const commentSchema =  new Schema<IComment>(
    {
        commentID: {
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
        discussionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        comments: {
            type: [commentSchema]
        }
    }
)

const groupSchema = new Schema<IGroup>(
    {
        name: {
            type: String,
            required: true,
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'           
        }],
        discussions: {
            type: [discussionSchema]
        }
    }
)

export const Group = model<IGroup>('Group', groupSchema)