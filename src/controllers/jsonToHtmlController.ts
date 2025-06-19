import { Request, Response } from "express";
import json2mjml from "mjml";
import mjml2html from "mjml";

const JsonToHtmlController = {
  translate: async (req: Request, res: Response) => {
    try {
      const mjmlResult = json2mjml(req.body);
      const mjml = mjmlResult.html;
      console.log("mjmlResult : ", mjmlResult.html);
      const { html, errors } = mjml2html(mjml);

      if (errors && errors.length) {
        res.status(400).json({ errors });
      } else {
        res.json({ html });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
};

export default JsonToHtmlController;
