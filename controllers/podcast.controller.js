import { Podcast } from "../models/podcast.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import path from 'path';

const listPodcasts = asyncHandler(async (req, res) => {
    const podcasts = await Podcast.find({}).populate("createdBy", "fullName email");

    if (!podcasts) {
        throw new ApiError(404, "No podcasts found");
    }

    res.status(200).json({
        message: "Podcasts fetched successfully",
        podcasts
    });
});

const listPodcastById = asyncHandler(async (req, res) => {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
        throw new ApiError(404, "Podcast not found");
    }

    res.status(200).json({
        message: "Podcast fetched successfully",
        podcast
    });
});

const createPodcast = asyncHandler(async (req, res) => {
    const { title, description, createdBy } = req.body;

    const File = req.files.Podcast[0].path;
    console.log(File);

    const podcast = await Podcast.create({
        title,
        description,
        createdBy,
        File
    });

    if (!podcast) {
        throw new ApiError(500, "Something went wrong while creating the podcast");
    }

    res.status(201).json({
        message: "Podcast created successfully",
        podcast
    });
});

const editPodcast = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const File = req.files.Podcast[0].path;

    // const oldFile = await Podcast.findById(req.params.id);
    const podcast = await Podcast.findByIdAndUpdate(req.params.id, {
        title,
        description,
        File
    });

    if (!podcast) {
        throw new ApiError(500, "Something went wrong while editing the podcast");
        return;
    }

     // Delete the file
    fs.unlink(podcast.File, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${err.message}`);
        }
    });

    res.status(200).json({
        message: "Podcast edited successfully",
        podcast
    });
});

const deletePodcast = asyncHandler(async (req, res) => {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);

    if (!podcast) {
        throw new ApiError(404, "Podcast not found");
    }
    
    console.log(podcast.File+" deleting");

    // Delete the file
    fs.unlink(podcast.File, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${err.message}`);
        }
    });

    res.status(200).json({
        message: "Podcast deleted successfully",
    });
});

export {
    listPodcasts,
    listPodcastById,
    createPodcast,
    editPodcast,
    deletePodcast
};