import { client } from "../client.js";

async function dropTables() {
  console.log("Drop tables section");
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS item_category;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS ordered_items;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables");
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255),
        email varchar(255) UNIQUE NOT NULL,
        first_name varchar(255),
        last_name varchar(255),
        role varchar(255) DEFAULT user NOT NULL,
        address_1 varchar(255),
        address_2 varchar(255),
        city varchar(255) NOT NULL,
        state varchar(255) NOT NULL,
        zip_code INTEGER,
        country varchar(255) NOT NULL,
        shipping_address_1 varchar(255) NOT NULL,
        shipping_address_2 varchar(255),
        shipping_city varchar(255) NOT NULL,
        shipping_state varchar(255) NOT NULL,
        shipping_zip_code INTEGER,
        shipping_counry varchar(255) NOT NULL
        );
      `);
    console.log("users table crated");
    await client.query(`
      CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(Id),
      billing_address_1 varchar(255),
      billing_address_2 varchar(255),
      billing_city TEXT,
      billing_state TEXT,
      billing_zip_code INTEGER,
      shipping_address_1 varchar(255),
      shipping_address_2 varchar(255),
      shipping_city varchar(255),
      shipping_state varchar(255),
      shipping_zip_code INTEGER,
      shipping_country varchar(255),
      email varchar(255),
      order_total NUMERIC,
      use_default_address BOOLEAN DEFAULT FALSE,
      checkout_complete BOOLEAN DEFAULT FALSE,
      order_fulfilled BOOLEAN DEFAULT FALSE
      );
      `);
    console.log("orders table crated");

    await client.query(`
      CREATE TABLE items (
        id SERIAL PRIMARY KEY, 
        title varchar(255),
        price NUMERIC,
        inventory INTEGER,
        image_name varchar(100)
      );
      `);
    console.log("items table created");

    await client.query(`
      CREATE TABLE ordered_items (
      id SERIAL PRIMARY KEY,
      "itemId" INTEGER REFERENCES items(id),
      "orderId" INTEGER REFERENCES orders(id),
      "orderPrice" NUMERIC,
      qty INTEGER
      );
      `);
    console.log("ordered_items table created");

    await client.query(`
      CREATE TABLE category (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
      );
      `);
    console.log("category table created");
    // create table item_category
    await client.query(`
      CREATE TABLE item_category (
      id SERIAL PRIMARY KEY,
      "item_id" INTEGER REFERENCES items(id),
      "category_id" INTEGER REFERENCES category(id)
      );
      `);
    console.log("item_category table created");

    //create table category
  } catch (error) {
    console.error("Error creating tables");
    throw error;
  }
}

export { dropTables, createTables };
