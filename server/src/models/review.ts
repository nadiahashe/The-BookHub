// A review is a contains content and userID

import { Schema, Document, Types } from "mongoose";

interface IReview extends Document {
    content: string;
    username: string;
    shared: boolean;
    reviewId: Schema.Types.ObjectId;
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
        },
        reviewId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        }
    }  
)

export default reviewSchema