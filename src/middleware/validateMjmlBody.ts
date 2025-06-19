import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateZodBody = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      //Match thì propagate về phía trước
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        res.status(400).json({
          errors: err.errors.map((e) => ({
            status: false,
            code: 400,
            message: e.message,
          })),
        });
      } else {
        next(err);
      }
    }
  };
};
