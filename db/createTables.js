 const client = require("./client");
 
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
        address_1 INTEGER,
        address_2 INTEGER,
        city varchar(255) NOT NULL,
        state varchar(255) NOT NULL,
        zip_code INTEGER,
        country varchar(255) NOT NULL,
        shipping_address_1  INTEGER,
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
      billing_address_1 INTEGER NOT NULL,
      billing_address_2 INTEGER NOT NULL,
      billing_city TEXT NOT NULL,
      billing_state TEXT NOT NULL,
      billing_zip_code INTEGER NOT NULL,
      billing_country,
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
      price INTEGER,
      qty INTEGER
      );
      `);

      await client.query(`
      CREATE TABLE items (
      id SERIAL PRIMARY KEY, 
      title varchar(255),
      price INTEGER,
      inventory INTEGER,
      "item_category" REFERENCES category(name),
      [image name] nvarchar(100),
      [image] varbinary(max)
      );
      `);

    // create table item_category
      await client.query(`
      CREATE TABLE item_category (
      id SERIAL PRIMARY KEY,
      "item_id" INTEGER REFERENCES item(id),
      "category_id" INTEGER REFERENCES category(id)
      );
      `)
    //create table category
      await client.query(`
      CREATE TABLE category (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
      );
      `)

    } catch (error) {
        console.error("Error creating tables")
        throw error;
    }

 }