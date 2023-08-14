import { client } from "./client.js";

async function createOrder( ...fields ) {
  const dataArray = Object.values(fields);
  console.log('ORDERFIELDS', dataArray)
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

  const orderSQL = `
        INSERT INTO orders
        (${orderFields})
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *;
        `;

  const {rows: [order] } = await client.query(orderSQL, [fields]);
  return order;
}

async function getAllOpenOrders() {
  const { rows: orders } = await client.query(
    `
      SELECT *
      FROM orders 
    `
  );
  return orders;
}

async function getOrderById(id) {
  const { rows: [order], } = await client.query(
    `
      SELECT *
      FROM orders
      WHERE id=$1;  
    `,
    [id]
  );
}

async function getOrderByUser(user_name) {
  const { rows: [order], } = await client.query(
    `
      SELECT orders.*, users.user_name
      FROM orders
      JOIN users ON orders.user_id = users.id
      WHERE user_name=$1; 
    `,
    [user_name]
  );
  return order;
}

async function deleteOrder(id) {
  await client.query(
    `
      DELETE FROM orders
      WHERE id=$1 
      RETURNING * 
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
