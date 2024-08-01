import { Router } from "express";
const contactRouter = Router();
import { listContacts, listContactById, createContact, deleteContact } from "../controllers/contact.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

contactRouter.route("/list").get(listContacts);

contactRouter.route("/list/:id").get(listContactById);

contactRouter.route("/create").post(VerifyJWT, createContact);

contactRouter.route("/delete/:id").delete(VerifyJWT, deleteContact);

export default contactRouter;