import express from "express";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import * as PostController from "../controllers/PostController.js";
import { postCreateValidation } from "../validations.js";

const router = express.Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.post(
  "/",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
router.delete("/:id", checkAuth, PostController.remove);
router.patch(
  "/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

export default router;
