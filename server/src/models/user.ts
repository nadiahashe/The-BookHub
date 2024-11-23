// a user will contain a username, email, a password, and an array of books they've reviewed

import { Schema, model, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    books: ObjectId[];
    groups: ObjectId[];
    invitations: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        books: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        groups: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Group'
            }
        ],
        invitations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Group'
            }
        ]
    }
)

export const User = model('User', userSchema)