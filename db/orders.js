/* eslint-disable */
const client = require("./client");

async function createOrder() {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders()
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [ORDER_item_id, User_id, email]
    );
  } catch (error) {
    throw error;
  }
}
