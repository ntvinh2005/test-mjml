import { z } from "zod";
import { jsonBodySchema } from "../schemas/jsonBodySchema";

export type JsonBody = z.infer<typeof jsonBodySchema>;
