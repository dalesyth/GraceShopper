/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const server = express();
// eslint-disable-next-line no-unused-vars
const { client } = require("./db");
const { SERVER_PORT } = process.env;
const morgan = require("morgan");


server.use(morgan("dev"));

const cors = require("cors");

server.use(cors());

server.use(express.json());

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
