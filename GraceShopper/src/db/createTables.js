 const client = require("./client");
 
 async fuction createTables() {
    try {
        
    console.log("Starting to build tables...")
    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255)
        email varchar(255)
        first_name varchar(255)
        last_name varchar(255)
        address_1
        address_2
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

    // create table Item

    // create table item_category

    //create table category

    } catch (error) {
        console.error("Error creating tables")
        throw error;
    }
async function 

 }