import { client } from "../client";
import { bycrypt } from "bycrypt"

async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPasssword = await bycrypt.hash(password, SALT_COUNT);
  const userSql = `INSERT INTO users (username, password) VALUES ($1, $2)
  ON CONFLICT (username) DO NOTHING RETURNING * ;`;
  const data = [username, hashedPasssword];
  const { rows: user } = await client.query(userSql, data);
  delete user[0].password;

  return user[0];
}  

export {
  createUser,
};