// A review is a contains content and userID

import { Schema, model, Document, ObjectId } from "mongoose";

interface IReview extends Document {
    content: string,
    book: ObjectId
    user: ObjectId,
    progress: string,
    shared: boolean
}

const reviewSchema = new Schema<IReview>(
    {
        content: {
            type: String,
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        progress: {
            type: String
        },
        shared: {
            type: Boolean
        }
    }  
)

export const Review = model('Review', reviewSchema)