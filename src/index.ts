import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mjml2html from "mjml";

const app = express();
app.use(bodyParser.json());

/**
 * Req:
 * {
 *   "title": "Hello",
 *   "body": "Welcome to MJML"
 * }
 * Response ->>>>>>> Render
 * <mjml><mj-body><mj-section><mj-column>
 *   <mj-text>Hello</mj-text>
 *   <mj-text>Welcome to MJML</mj-text>
 * </mj-column></mj-section></mj-body></mjml>
 */

function jsonToMjml(data: { title: string; body: string }) {
  return `
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text font-size="20px" font-weight="bold">${data.title}</mj-text>
            <mj-text>${data.body}</mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;
}

app.post("/render", (req: Request, res: Response) => {
  try {
    const mjml = jsonToMjml(req.body);
    const { html, errors } = mjml2html(mjml);

    if (errors && errors.length) {
      res.status(400).json({ errors });
    } else {
      res.json({ html });
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "MJML microservice is running now lol. Try POST /render",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MJML microservice running on http://localhost:${PORT}`);
});
