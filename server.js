import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import { SERVER_PORT } from "./env";
const SERVER_PORT = 3000;

const server = express();

import morgan from "morgan";
server.use(morgan("dev"));

import cors from "cors";
server.use(cors());

server.use(express.json());

import apiRouter from "./api/index.js";
server.use("/api", apiRouter);

import { client } from "./db/client.js";
client.connect();

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
