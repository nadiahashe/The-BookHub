// A book will contain a title, an author, an image, and an array of reviews.

import { Schema, model, Document, ObjectId } from "mongoose";

export interface IBook extends Document {
    title: string,
    authors: string[],
    image: string,
    reviews: ObjectId[]
    bookId: string
}

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true
        },
        authors: {
            type: [String],
            required: true
        },
        image: {
            type: String,
            required: false
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }],
        bookId: {
            type: String,
            required: true,
            unique: true
        }
    }
)

export const Book = model('Book', bookSchema)

