import express from "express"
import { postUrlController, getUrlController, deleteUrlController } from "../controllers/url.controller.js";

const urlRoutes = express.Router();

urlRoutes.post("/", postUrlController)

urlRoutes.get("/", getUrlController)

urlRoutes.delete("/:id", deleteUrlController)

export default urlRoutes
