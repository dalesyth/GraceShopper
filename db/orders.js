import { client } from "./client.js";

// Create a new order
async function createOrder({ ...fields }) {
  const dataArray = Object.values(fields);
  // console.log("ORDERFIELDS", dataArray);
  // const orderFields = Object.keys(fields);
  //Build fields list
  let columnNames = Object.keys(fields)
    .map((key) => `"${key}"`)
    .join(", ");
  //Build VALUES place holder.
  let i = 1;
  let valuePlaceHolders = Object.keys(fields)
    .map(() => {
      let placeHolder = `$${i}`;
      i = i + 1;
      return placeHolder;
    })
    .join(", ");
  // const orderFields = `
  //   user_id,
  //   billing_address_1,
  //   billing_address_2,
  //   billing_city,
  //   billing_state,
  //   billing_zip_code,
  //   email,
  //   shipping_address_1,
  //   shipping_address_2,
  //   shipping_city,
  //   shipping_state,
  //   shipping_zip_code,
  //   shipping_country,
  //   order_total
  // `;

  console.log(`columnNames: ${columnNames}`);
  console.log(`valuePlaceHolders: ${valuePlaceHolders}`);
  console.log(`dataArray: ${dataArray}`);

  const {
    rows: [order],
  } = await client.query(
    `
        INSERT INTO orders
        (${columnNames})
        VALUES(${valuePlaceHolders})
        RETURNING *;
        `,
    dataArray
  );
  console.log(`order from createOrder: ${order}`);
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
              JOIN users ON orders.user_id = users.id
            WHERE users.username = $1; 
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
