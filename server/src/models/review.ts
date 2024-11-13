// A review is a contains content and userID

import { Schema, model, Document, ObjectId } from "mongoose";

interface IReview extends Document {
    content: string,
    username: ObjectId
}

const reviewSchema = new Schema<IReview>(
    {
        content: {
            type: String,
            minlength: 1,
            required: true
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }  
)

export const Review = model('Review', reviewSchema)