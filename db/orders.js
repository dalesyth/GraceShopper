import { client } from "./client.js";

// Create a new order
async function createOrder({ ...fields }) {
  const dataArray = Object.values(fields);
  console.log("ORDERFIELDS", dataArray);
  const orderFields = `
    user_id,
    billing_address_1,
    billing_address_2,
    billing_city,
    billing_state,
    billing_zip_code,
    email,
    shipping_address_1,
    shipping_address_2,
    shipping_city,
    shipping_state,
    shipping_zip_code,
    shipping_country,
    order_total
  `;

  const {
    rows: [order],
  } = await client.query(
    `
        INSERT INTO orders
        (${orderFields})
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *;
        `,
    dataArray
  );
  return order;
}

// Get all open orders
async function getAllOpenOrders() {
  const { rows: orders } = await client.query(
    `
            SELECT 
              orders.*,
              ordered_items.price AS item_price,
              ordered_items.qty AS item_quantity,
              items.title AS item_title
            FROM orders
              JOIN ordered_items ON orders.id = ordered_items."orderId"
              JOIN items ON ordered_items."itemId" = items.id
            WHERE
              orders.order_fulfilled = FALSE; 
            `
  );

  return orders;
}

// Get an order by a specific order ID
async function getOrderById(orderId) {
  const {
    rows: [order],
  } = await client.query(
    `
    SELECT 
      orders.*, 
      ordered_items.price AS item_price,
      ordered_items.qty AS item_quantity,
      items.title AS item_title
    FROM orders
      JOIN ordered_items ON orders.id = ordered_items."orderId"
      JOIN items ON ordered_items."itemId" = items.id
    WHERE orders.id = $1; 
  `,
    [orderId]
  );
  return order;
}

// Get orders for a specific user
async function getOrderByUser(username) {
  const {
    rows: [order],
  } = await client.query(
    `
            SELECT 
              orders.*, 
              ordered_items.price AS item_price,
              ordered_items.qty AS item_quantity,
              items.title AS item_title
            FROM orders
              JOIN ordered_items ON orders.id = ordered_items."orderId"
              JOIN items ON ordered_items."itemId" = items.id
              JOIN users ON orders."User_id" = users.id
            WHERE 
              users.username = $1; 
            `,
    [username]
  );
  return order;
}

// Delete an order by order id
async function deleteOrder(id) {
  await client.query(
    `
            DELETE FROM orders
            WHERE id=$1 
            RETURNING *; 
            `,
    [id]
  );
}

export {
  createOrder,
  getAllOpenOrders,
  getOrderById,
  getOrderByUser,
  deleteOrder,
};
