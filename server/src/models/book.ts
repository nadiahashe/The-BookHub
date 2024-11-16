// A book will contain a title, an author, an image, and an array of reviews.

import { Schema, model, Document } from "mongoose";
import Review from "./review.js";

export interface IBook extends Document {
    title: string;
    authors: string[];
    image: string;
    review: typeof Review;
    bookId: string;
    progress: number
}

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true
        },
        authors: {
            type: [String],
        },
        image: {
            type: String,
        },
        review: {
            type: Review
        },
        bookId: {
            type: String,
            required: true,
            unique: true
        },
        progress: {
            type: Number
        }
    }
)

export const Book = model('Book', bookSchema)

