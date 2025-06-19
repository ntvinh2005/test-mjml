import { z } from "zod";
import { Request, Response, NextFunction } from "express";

// Validation middleware factory
export const validateZodBody = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check rỗng
      if (req.body === undefined || req.body === null) {
        next({
          success: false,
          code: 400,
          error: "Request body is required",
          message: "Please provide a valid JSON body",
        });
      }

      // Check dữ liệu đầu vào so với kieeurbieens trong schema
      const result = schema.safeParse(req.body);

      if (!result.success) {
        next({
          error: "JSON body validation failed",
          details: result.error.errors.map((err) => ({
            success: false,
            code: 400,
            message: err.message,
          })),
        });
      }

      req.body = result.data;
      next();
    } catch (error: any) {
      next(error);
    }
  };
};
