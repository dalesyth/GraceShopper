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
        address_1,
        address_2,
        city varchar(255),
        state varchar(255),
        zip_code INTEGER
        );
      `);

      await client.query(`
      CREATE TABLE orders,
      id SERIAL PRIMARY KEY,
      ORDER_item_id SERIAL PRIMARY KEY,
      User_id SERIAL PRIMARY KEY,
      email varchar(255)
      );
      `);

      await client.query(`
      CREATE TABLE ordered_items,
      id SERIAL PRIMARY KEY,
      "itemId" INTEGER REFERENCES item(Id),
      "orderId" INTEGER REFERENCES item(Id),
      price INTEGER,
      qty INTEGER
      );
      `);

      await client.query(`
      CREATE TABLE items,
      id SERIAL PRIMARY KEY, 
      title varchar(255)
      price INTEGER
      inventory INTEGER
      product_category varchar(255)
      [image name] nvarchar(100)
      [image] varbinary(max)
      `)

    // create table Item

    // create table item_category

    //create table category

    } catch (error) {
        console.error("Error creating tables")
        throw error;
    }
async function 

 }