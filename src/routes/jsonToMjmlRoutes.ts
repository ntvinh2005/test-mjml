import { Router } from "express";
import JsonToMjmlController from "../controllers/jsonToMjmlController";
import { validateZodBody } from "../middleware/validateJsonBody";
import { jsonBodySchema } from "../schemas/jsonBodySchema";

const router: Router = Router();

router.post(
  "/json-mjml",
  validateZodBody(jsonBodySchema),
  JsonToMjmlController.translate
);

export default router;
