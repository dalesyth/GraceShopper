import { client } from "./client.js";

async function getCartData(userId) {
  try {
    const { rows } = await client.query(
      `
              SELECT users.id, orders.id as order_id, ordered_items.id as ordered_items_id, ordered_items.qty, ordered_items."orderPrice", items.title, items.price, items.image_name
              FROM users
              JOIN orders ON users.id = orders.user_id
              JOIN ordered_items ON orders.id = ordered_items."orderId"
              JOIN items ON ordered_items."itemId" = items.id
              WHERE users.id = $1 AND checkout_complete = false
            `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.error(`db error getting cart data: ${error}`);
  }
}

export { getCartData };
