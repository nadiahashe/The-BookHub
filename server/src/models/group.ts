// a group will contain a name, an array of users, and an array of discussions

import { Schema, model, Document, ObjectId } from "mongoose";

interface IGroup extends Document {
    name: string,
    users: ObjectId[],
    discussions: ObjectId[]
}

const groupSchema = new Schema<IGroup>(
    {
        name: {
            type: String,
            required: true,
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'           
        }],
        discussions:[{
            type: Schema.Types.ObjectId,
            ref: 'Discussion'
        }]
    }
)

export const Group = model<IGroup>('Group', groupSchema)