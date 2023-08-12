import { client } from "../client.js";

// import pkg from "bcrypt";
// const { bcrypt } = pkg;
import * as bcrypt from "bcrypt";

async function createUser({ ...userFields }) {
  const SALT_COUNT = 10;
  const password = userFields.password;

  delete userFields.password; 

  const dataArray = Object.values(userFields);
  const hashedPasssword = await bcrypt.hash(password, SALT_COUNT);
  
  let columnNames = Object.keys(userFields)
    .map((key) => `"${key}"`)
    .join(", ");

  columnNames = columnNames + `, password`
  let valuePlaceHolders = Object.keys(userFields)
    .map((index) => `$${index + 1}`)
    .join(", ");
  
  valuePlaceHolders = valuePlaceHolders + `${dataArray.length}`

  const userSql = `INSERT INTO users (${columnNames}) VALUES (${valuePlaceHolders})
  ON CONFLICT (username) DO NOTHING RETURNING * ;`;

  const data = [hashedPasssword];
  console.log(userSql)
  //const { rows: user } = await client.query(userSql, data);
  //delete user[0].password;

  //return user[0];
}  

export {
  createUser,
};