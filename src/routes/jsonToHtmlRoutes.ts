import { Router } from "express";
import JsonToHtmlController from "../controllers/jsonToHtmlController";
import { validateZodBody } from "../middleware/validateJsonBody";
import { jsonBodySchema } from "../schemas/jsonBodySchema";

const router: Router = Router();

router.post(
  "/json-html",
  validateZodBody(jsonBodySchema),
  JsonToHtmlController.translate
);

export default router;
