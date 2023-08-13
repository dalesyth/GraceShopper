import { client } from "../client.js";

async function dropTables() {
  console.log("Drop tables section");
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS item_category;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS ordered_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users
    );
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
        email varchar(255),
        first_name varchar(255),
        last_name varchar(255),
        address_1 varchar(255),
        address_2 varchar(255),
        city varchar(255) NOT NULL,
        state varchar(255) NOT NULL,
        zip_code INTEGER,
        country varchar(255) NOT NULL,
        shipping_address_1 varchar(255) NOT NULL,
        shipping_address_2 varchar(255) NOT NULL,
        shipping_city varchar(255) NOT NULL,
        shipping_state varchar(255) NOT NULL,
        shipping_zip_code INTEGER,
        shipping_counry varchar(255) NOT NULL
        );
      `);

    await client.query(`
      CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "order_item_id" INTEGER REFERENCES ordered_items(id),
      "User_id" INTEGER REFERENCES users(Id),
      billing_address_1 varchar(255),
      billing_address_2 INTEGER NOT NULL,
      billing_city TEXT NOT NULL,
      billing_state TEXT NOT NULL,
      billing_zip_code INTEGER NOT NULL,
      email varchar(255),
      shipping_address_1 varchar(255) NOT NULL,
      shipping_address_2 varchar(255) NOT NULL,
      shipping_city varchar(255) NOT NULL,
      shipping_state varchar(255) NOT NULL,
      shipping_zip_code INTEGER NOT NULL,
      shipping_country varchar(255) NOT NULL,
      email varchar(255) UNIQUE NOT NULL,
      order_total INTEGER,
      use_default_address BOOLEAN DEFAULT FALSE,
      checkout_complete BOOLEAN DEFAULT FALSE,
      order_fulfilled BOOLEAN DEFAULT FALSE
      );
      `);

    await client.query(`
      CREATE TABLE ordered_items (
      id SERIAL PRIMARY KEY,
      "itemId" INTEGER REFERENCES items(Id),
      "orderId" INTEGER REFERENCES orders(Id),
      price MONEY,
      qty INTEGER
      );
      `);

    await client.query(`
      CREATE TABLE items (
      id SERIAL PRIMARY KEY, 
      title varchar(255),
      price MONEY,
      inventory INTEGER,
      [image name] varchar(100)
      );
      `);

    // create table item_category
    await client.query(`
      CREATE TABLE item_category (
      id SERIAL PRIMARY KEY,
      "item_id" INTEGER REFERENCES item(id),
      "category_id" INTEGER REFERENCES category(id)
      );
      `);
    //create table category
    await client.query(`
      CREATE TABLE category (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
      );
      `);
  } catch (error) {
    console.error("Error creating tables");
    throw error;
  }
}

export { dropTables, createTables };
