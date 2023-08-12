/* eslint-disable */
const client = require("./client");

async function createOrder({
  order_item_d,
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
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders
        (order_item_d, user_id, billing_address_1, billing_address_2, billing_city, billing_state, billing_zip_code, email, shipping_address_1, shipping_address_2, shipping_city, shipping_state, shipping_zip_code, shipping_country, order_total)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *;
        `,
      [
        order_item_d,
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
      ]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
};
