// a group will contain a name, an array of users, and an array of discussions

import { Schema, model, Document, ObjectId } from "mongoose";

interface IGroup extends Document {
    groupname: string,
    leader: ObjectId
    users: ObjectId[],
    discussions: ObjectId[]
}

const groupSchema = new Schema<IGroup>(
    {
        groupname: {
            type: String,
            required: true,
            unique: true
        },
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'User'
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