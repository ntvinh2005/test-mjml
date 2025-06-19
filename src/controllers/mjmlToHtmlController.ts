import { Request, Response } from "express";
import mjml2html from "mjml";

const MjmlToHtmlController = {
  translate: async (req: Request, res: Response): Promise<void> => {
    try {
      const mjml = req.body.mjml;
      const { html, errors: htmlErrors } = mjml2html(mjml, {
        beautify: false,
        minify: true,
      });

      if (htmlErrors?.length) {
        res.status(400).json({ errors: htmlErrors });
        return; // early exit, no return value
      }

      const singleLineHtml = html.replace(/(\r\n|\n|\r)/g, "");

      console.log(singleLineHtml);

      res.json({ html: singleLineHtml });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
};

export default MjmlToHtmlController;
