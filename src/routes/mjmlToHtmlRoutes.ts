import { Router } from "express";
import MjmlToHtmlController from "../controllers/mjmlToHtmlController";
import { validateZodBody } from "../middleware/validateMjmlBody";
import { mjmlBodySchema } from "../schemas/mjmlBodySchema";

const router: Router = Router();

router.post(
  "/mjml-html",
  validateZodBody(mjmlBodySchema),
  MjmlToHtmlController.translate
);

export default router;
