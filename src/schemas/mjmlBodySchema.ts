import { z } from "zod";

export const mjmlBodySchema = z.object({
  mjml: z.string().nonempty("mjml is required"),
});
