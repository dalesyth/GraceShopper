import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

  const connection = process.env.REACT_APP_CONNECTION_STRING;

  console.log("CONNECTION",connection)
const client = new Pool({connection});

export { client };
