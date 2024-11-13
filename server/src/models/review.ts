// A review is a contains content and userID

import { Schema, model, Document } from "mongoose";

interface IReview extends Document {
    content: string,
    username: string,
    progress: string,
    public: boolean
}

const reviewSchema = new Schema<IReview>(
    {
        content: {
            type: String,
        },
        username: {
            type: String,
            required: true
        },
        progress: {
            type: String
        },
        public: {
            type: Boolean
        }
    }  
)

export const Review = model('Review', reviewSchema)