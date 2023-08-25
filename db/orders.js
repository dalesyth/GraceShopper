import { client } from "./client.js";

// Create a new order
async function createOrder({ ...fields }) {
  const dataArray = Object.values(fields);
  //Build fields list
  let columnNames = Object.keys(fields)
    .map((key) => `"${key}"`)
    .join(", ");
  //Build VALUES place holder.
  let valuePlaceHolders = Object.keys(fields)
    .map((keys, index) => {
      return `$${index + 1}`;
    })
    .join(", ");

  const newOrderSQL = `
        INSERT INTO orders
        (${columnNames})
        VALUES(${valuePlaceHolders})
        RETURNING *;
        `;

  const {
    rows: [order],
  } = await client.query(newOrderSQL, dataArray);
  return order;
}
/////////////////////////////////////////////////
//retrieve a list of items on an order
async function AttachOrderItems(orders) {
  if (!orders?.length) {
    return [];
  }
  //Build VALUES place holder.
  const placeHolders = orders.map((_, index) => `$${index + 1}`).join(", ");
  const data = orders.map((order) => order.id);
  const itemSQL = `SELECT *
    FROM items
    RIGHT JOIN ordered_items  as o_i ON o_i."itemId" = items.id
    WHERE "orderId" IN (${placeHolders});`;

  try {
    const { rows: items } = await client.query(itemSQL, data);
    orders.forEach((order) => {
      order.orderItems = items.filter((item) => item.orderId === order.id);
    });
    return orders;
  } catch (error) {
    console.error(`Error retrieving items on an order - - - ${error}`);
  }
}

// ///////////////////////////////////////////////
// Get all open orders
async function getAllOpenOrders() {
  const openOrderSQL = `
    SELECT orders.* 
    FROM orders	    
    WHERE orders.order_fulfilled = FALSE
    GROUP BY orders.id;`;
  const { rows: orders } = await client.query(openOrderSQL);

  const result = await AttachOrderItems(orders);
  return result;
}

// Get an order by a specific order ID
async function getOrderById(orderId) {
  const { rows: order } = await client.query(
    `SELECT 
      orders.*
    FROM orders
    WHERE orders.id = $1;`,
    [orderId]
  );

  const result = await AttachOrderItems(order);
  return result;
}

// Get orders for by username
async function getOrderByUser(username) {
  const {
    rows: [order],
  } = await client.query(
    `
    SELECT * 
    FROM orders
    WHERE users.username = $1; 
    `,
    [username]
  );
  const result = await AttachOrderItems(order);
  return result;
}

// GET orders by userId
async function getOrderByUserId(userId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
      `,
      [userId]
    );

    return order;
  } catch (error) {
    console.error(`db error getting order by userId: ${error}`);
  }
}

// Delete an order by order id
async function deleteOrder(id) {
  //delete order from ordered_items table
  await client.query(
    `DELETE FROM ordered_items
     WHERE "orderId" = $1;
    `,
    [id]
  );
  //delete order from orders table
  await client.query(
    `DELETE FROM orders
    WHERE id=$1;`,
    [id]
  );
}

export {
  createOrder,
  getAllOpenOrders,
  getOrderById,
  getOrderByUser,
  getOrderByUserId,
  deleteOrder,
};
