// A review is a contains content and userID

import { Schema, Document } from "mongoose";

export interface IReview extends Document {
    content: string;
    username: string;
    shared: boolean;
}

const reviewSchema = new Schema<IReview>(
    {
        content: {
            type: String,
        },
        username: {
            type: String,
        },
        shared: {
            type: Boolean
        }
    }  
)

export default reviewSchema