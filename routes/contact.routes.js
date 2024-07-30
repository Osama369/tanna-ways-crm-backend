import { Router } from "express";
const contactRouter = Router();
import { listContacts, listContactById, createContact, deleteContact } from "../controllers/contact.controller.js";

contactRouter.route("/list").get(listContacts);

contactRouter.route("/list/:id").get(listContactById);

contactRouter.route("/create").post(createContact);

contactRouter.route("/delete/:id").delete(deleteContact);

export default contactRouter;