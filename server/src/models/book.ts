// A book will contain a title, an author, an image, and an array of reviews.

import { Schema, model, Document, ObjectId } from "mongoose";

export interface IBook extends Document {
    title: string,
    author: string,
    image: string,
    reviews: ObjectId[]
}

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }]
    }
)

export const Book = model('Book', bookSchema)

