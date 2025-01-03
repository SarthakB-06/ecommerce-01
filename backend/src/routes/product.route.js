import { Router } from "express";
import { getProducts , getProductById } from "../controllers/user.controller.js";

const router = Router()

router.route("/").get(getProducts)

router.route("/:id").get(getProductById)

export default router;