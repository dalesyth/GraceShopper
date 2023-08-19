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
      return  `$${index + 1}`;
    })
    .join(", ");
  
 const newOrderSQL = `
        INSERT INTO orders
        (${columnNames})
        VALUES(${valuePlaceHolders})
        RETURNING *;
        `;
 
  const { rows: [order], } = await client.query(newOrderSQL, dataArray);

  return order;
}

//retrieve a list of items on an order
async function getOrderItems(items) {
  //Build VALUES place holder.
  let valuePlaceHolders = Object.keys(items)
    .map((key, index) => { 
      let placeHolder = `$${index + 1}`;
      return placeHolder;
    }).join(", ");

  const itemSQL = `
      SELECT *
      FROM items
      WHERE id IN (${valuePlaceHolders}); 
      `;

  try {
    const {rows}= await client.query(itemSQL, items);
    return rows;
  } catch (error) {
    console.error(`Error retrieving items on an order - - - ${error}`);
    throw error;
  }
}
// Get all open orders
async function getAllOpenOrders() {
  const openOrderSQL = `
    SELECT orders.*, STRING_AGG(items.id::TEXT, ', ') AS "orderItems"
    FROM orders
	    JOIN ordered_items ON orders.id = ordered_items."orderId"
      JOIN items ON ordered_items."itemId" = items.id
    WHERE orders.order_fulfilled = FALSE
    GROUP BY orders.id; 
    `;
  console.log("SQL", openOrderSQL)
  const { rows } = await client.query( openOrderSQL );
  let result = rows;
  console.log("ORDERS RESULT: ", orders);
const itemString = result.orderItems.split (', ')
const itemArray = itemString.map(Number);
//result.orderItems = await getOrderItems(itemArray);
console.log('ORDERS: ', result)
  return result;
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
