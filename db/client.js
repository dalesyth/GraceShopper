import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

const connectionString = process.env.REACT_APP_CONNECTION_STRING;

const client = new Pool({ connectionString }); // Use connectionString here

export { client };
