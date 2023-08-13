/* eslint-disable */
const client = require("./client");

async function createOrder({ ...fields }) {
  const orderFields = {
    order_item_id,
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
    order_total,
  };

  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders
        (orderFields)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *;
        `,
      [orderFields]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOpenOrders() {
  try {
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
              orders.order_fulfilled = TRUE; 
            `
    );

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
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
  } catch (error) {
    throw error;
  }
}

async function getOrderByUser(username) {
  try {
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
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(id) {
  try {
    await client.query(
      `
            DELETE FROM orders
            WHERE id=$1 
            RETURNING * 
            `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllOpenOrders,
  getOrderById,
  getOrderByUser,
};
