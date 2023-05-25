import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routers/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(urlencodedParser, jsonParser, cookieParser());
app.use("/auth", authRouter);

async function run() {
  await connect(
    "mongodb+srv://tkulzhan:tkulzhan@cluster.czbqaif.mongodb.net/gymshop?retryWrites=true&w=majority"
  )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

run();