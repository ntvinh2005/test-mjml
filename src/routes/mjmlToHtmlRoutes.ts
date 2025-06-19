import { Router } from "express";
import MjmlToHtmlController from "../controllers/mjmlToHtmlController";

const router: Router = Router();

router.post("/mjml-html", MjmlToHtmlController.translate);

export default router;
