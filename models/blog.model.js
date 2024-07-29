import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    poster: {
        type: String,
    }
},
{
    timestamps: true
})

export const Blog = mongoose.model("Blog", UserSchema)