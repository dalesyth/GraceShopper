import { client } from "./client.js";
import * as bcrypt from "bcrypt";

async function createUser({ ...userFields }) {
  //hash password and savig it back into userFields.
  const password = userFields.password;
  const SALT_COUNT = 10;
  const hashedPasssword = await bcrypt.hash(password, SALT_COUNT);
  userFields.password = hashedPasssword;

  //Build fields list
  let columnNames = Object.keys(userFields)
    .map((key) => `"${key}"`)
    .join(", ");
  //Build VALUES place holder.
  let i = 1;
  let valuePlaceHolders = Object.keys(userFields)
    .map(() => {
      let placeHolder = `$${i}`;
      i = i + 1;
      return placeHolder;
    })
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
async function getAllUsers() {
  try {
    console.log("Getting all users...");

    const { users } = await client.query(`
        SELECT * FROM users;
        `);

    if (!users) {
      return null;
    }

    return users;
  } catch (error) {
    console.log("Error getting all users!");
    throw error;
  }
}

async function getUser({ username, password }) {
  console.log("inside getUser");
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword);

  if (!user) {
    console.log("Error getting user");
    return null;
  }

  if (isValid) {
    delete user.password;

    return user;
  }
}

async function getUserByUsername({ username }) {
  try {
    console.log("Inside getUserByUsername");
    const {
      rows: [user],
    } = await client.query(`
SELECT id, username, password FROM users WHERE username = ${username};
`);

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log("Error getting user by username...");
    throw error;
  }
}

async function getUserById({ userId }) {
  try {
    console.log("Getting users...");

    const {
      rows: [user],
    } = await client.query(
      `
        SELECT id, username FROM users WHERE id=${userId};`,
      [userId]
    );
    delete user.password;

    return user;
  } catch (error) {
    console.log("Error getting users");
    throw error;
  }
}

export { createUser, getAllUsers, getUser, getUserById, getUserByUsername };
