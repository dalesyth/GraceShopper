/* eslint-disable */
import { client } from "./client";

// Create a new order
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

// Get all open orders
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
              orders.order_fulfilled = FALSE; 
            `
    );

    return orders;
  } catch (error) {
    throw error;
  }
}

// Get an order by a specific order ID
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

// Get orders for a specific user
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

// Delete an order by order id
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

export {
  createOrder,
  getAllOpenOrders,
  getOrderById,
  getOrderByUser,
  deleteOrder,
};
