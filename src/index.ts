import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(bodyParser.json());

app.use("/", routes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "MJML microservice is running now lol. Try POST /render",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MJML microservice running on http://localhost:${PORT}`);
});
