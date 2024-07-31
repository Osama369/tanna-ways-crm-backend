import mongoose, { Schema } from "mongoose";

const PodcastSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    File: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export const Podcast = mongoose.model("Podcast", PodcastSchema);
