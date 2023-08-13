import { client } from "../client.js";

import * as bcrypt from "bcrypt";

async function createUser({ ...userFields }) {
  //hash password and savig it back into userFields.
  const password = userFields.password;
  const SALT_COUNT = 10;
  const hashedPasssword = await bcrypt.hash(password, SALT_COUNT);
  userFields.password = hashedPasssword;
  
  //Build fields list
  let columnNames = Object.keys(userFields)
    .map((key) =>  `"${key}"`)
    .join(", ");
  //Build VALUES place holder.
  let i = 1
  let valuePlaceHolders = Object.keys(userFields)
    .map(() => {
      let placeHolder = `$${i}`;
      i= i +1;
      return placeHolder;  
      }
    )
    .join(", ");
  //Save userFields object to an array so it can be injected into the quary.
  const dataArray = Object.values(userFields); 
  //Build SQL
  const userSql = `INSERT INTO users (${columnNames}) VALUES (${valuePlaceHolders})
  ON CONFLICT (username) DO NOTHING RETURNING * ;`;
  
  //Run quary
  const { rows: user } = await client.query(userSql, dataArray);
  //delete password
  delete user[0].password;
  return user[0];
}  

export {
  createUser,
};