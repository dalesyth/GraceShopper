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
            SELECT *
            FROM orders 
            `
    );

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE id=$1;  
            `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderByUser(user_name) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT orders.*, users.user_name
            FROM orders
            JOIN users ON orders.user_id = users.id
            WHERE user_name=$1; 
            `,
      [user_name]
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
