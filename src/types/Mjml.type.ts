import { mjmlBodySchema } from "../schemas/mjmlBodySchema";
import { z } from "zod";
export type MjmlBody = z.infer<typeof mjmlBodySchema>;
