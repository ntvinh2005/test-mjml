import { Request, Response } from "express";
import json2mjml from "mjml";

const JsonToHtmlController = {
  translate: async (req: Request, res: Response) => {
    try {
      const mjmlResult = json2mjml(req.body);
      const html = mjmlResult.html;
      // I didn't replace \ since they are neccessary escape character for escape quote
      // Convert HTML to single-line string and escape backslashes and quotes
      const singleLine = html.replace(/(\r\n|\n|\r)/g, "");
      console.log(singleLine);
      res.json({ html: singleLine });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
};

export default JsonToHtmlController;
