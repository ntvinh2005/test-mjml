import { Router } from "express";
import JsonToHtmlController from "../controllers/jsonToHtmlController";

const router: Router = Router();

router.post("/json-html", JsonToHtmlController.translate);

export default router;
