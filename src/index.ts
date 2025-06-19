import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/`, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MJML microservice running on http://localhost:${PORT}`);
});
