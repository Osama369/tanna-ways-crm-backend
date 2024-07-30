import { Contact } from "../models/contact.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const listContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});

    if (!contacts) {
        throw new ApiError(404, "No contacts found");
    }

    res.status(200).json({
        message: "Contacts fetched successfully",
        contacts
    });
});

const listContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        throw new ApiError(404, "Contact not found");
    }

    res.status(200).json({
        message: "Contact fetched successfully",
        contact
    });
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
        name, 
        email, 
        message
    });

    if (!contact) {
        throw new ApiError(500, "Something went wrong while creating the contact");
    }

    res.status(201).json({
        message: "Contact created successfully",
        contact
    });
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
        throw new ApiError(404, "Contact not found");
    }

    res.status(200).json({
        message: "Contact deleted successfully",
    });
});

export {
    listContacts,
    listContactById,
    createContact,
    deleteContact
};