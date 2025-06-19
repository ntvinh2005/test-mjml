import { z } from "zod";

export const jsonBodySchema = z.object({
  json: z.object({}).passthrough(),
});
