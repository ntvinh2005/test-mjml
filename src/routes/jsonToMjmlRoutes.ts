import { Router } from "express";
import JsonToMjmlController from "../controllers/jsonToMjmlController";

const router: Router = Router();

router.post("/json-mjml", JsonToMjmlController.translate);

export default router;
