// A review is a contains content and userID

import { Schema, model, Document, ObjectId } from "mongoose";

interface IReview extends Document {
    content: string,
    username: ObjectId,
    progress: string
}

const reviewSchema = new Schema<IReview>(
    {
        content: {
            type: String,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        progress: {
            type: String
        }
    }  
)

export const Review = model('Review', reviewSchema)