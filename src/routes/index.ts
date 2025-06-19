import { Router, Request, Response, NextFunction } from "express";

import JsonToHtmlRoutes from "./jsonToHtmlRoutes";
import JsonToMjmlRoutes from "./jsonToMjmlRoutes";
import MjmlToHtmlRoutes from "./mjmlToHtmlRoutes";

const router = Router();

// API version config
const API_VERSION = "/api/v1";

router.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Try /translate-json-html or something similar to test the API",
  });
});

// Check server status
router.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Máy chủ đang hoạt động",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Connect sub router
router.use(`${API_VERSION}`, JsonToHtmlRoutes);
router.use(`${API_VERSION}`, JsonToMjmlRoutes);
router.use(`${API_VERSION}`, MjmlToHtmlRoutes);

// Handle 404
router.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Cannot find the route",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// internal server error please fix :')
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Lỗi máy chủ",
    error: err.message,
    timestamp: new Date().toISOString(),
  });
});

export default router;
