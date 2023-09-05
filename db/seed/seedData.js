import { createUser } from "../users.js";
import { createOrder } from "../orders.js";
import {
  createItem,
  attachItemToOrder,
  attachItemToCategory,
} from "../items.js";
import { createCategory } from "../categories.js";
async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        username: "albert",
        password: "soxAreGreat",
        email: "albert@myurl.com",
        first_name: "albert",
        last_name: "soxs",
        role: "guest",
        address_1: "353 My Street",
        address_2: "apt. 2",
        city: "Hit",
        state: "IA",
        zip_code: 50613,
        country: "USA",
        shipping_address_1: "250 Yourstreet",
        shipping_address_2: null,
        shipping_city: "Mantua",
        shipping_state: "UT",
        shipping_zip_code: 84324,
        shipping_country: "USA",
      },
      {
        username: "billybob",
        password: "funkyfrogs$5",
        email: "billy@myurl.com",
        first_name: "billy",
        last_name: "bob",
        role: "admin",
        address_1: "233 My Street",
        address_2: "apt. 27",
        city: "Ames",
        state: "IA",
        zip_code: 50613,
        country: "USA",
        shipping_address_1: "250 Thatstreet",
        shipping_address_2: null,
        shipping_city: "Omaha",
        shipping_state: "NE",
        shipping_zip_code: 84324,
        shipping_country: "USA",
      },
    ];

    await Promise.all(usersToCreate.map(createUser));

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialOrders() {
  console.log("Starting to create Orders...");
  try {
    const ordersToCreate = [
      {
        user_id: 1,
        billing_address_1: "353 My Street",
        billing_address_2: "apt. 2",
        billing_city: "Hit",
        billing_state: "IA",
        billing_zip_code: 50613,
        email: "albert@myurl.com",
        shipping_address_1: "353 My Street",
        shipping_address_2: "apt. 2",
        shipping_city: "Hit",
        shipping_state: "IA",
        shipping_zip_code: 50613,
        shipping_country: "USA",
        order_total: 2525.25,
      },
      {
        user_id: 1,
        billing_address_1: "353 My Street",
        billing_address_2: "apt. 2",
        billing_city: "Hit",
        billing_state: "IA",
        billing_zip_code: 50613,
        email: "albert@myurl.com",
        shipping_address_1: "353 My Street",
        shipping_address_2: "apt. 2",
        shipping_city: "Hit",
        shipping_state: "IA",
        shipping_zip_code: 50613,
        shipping_country: "USA",
        order_total: 100.25,
        checkout_complete: true,
      },
      {
        user_id: 2,
        billing_address_1: "233 My Street",
        billing_address_2: "apt. 27",
        billing_city: "Ames",
        billing_state: "IA",
        billing_zip_code: 50613,
        email: "billy@myurl.com",
        shipping_address_1: "250 Thatstreet",
        shipping_address_2: null,
        shipping_city: "Omaha",
        shipping_state: "NE",
        shipping_zip_code: 84324,
        shipping_country: "USA",
        order_total: 2500.36,
      },
    ];
    await Promise.all(ordersToCreate.map(createOrder));

    console.log("Finished creating initial orders!");
  } catch (error) {
    console.error("Error creating initial orders!");
    throw error;
  }
}

async function createInitialItems() {
  console.log("Starting to create items...");
  try {
    const ordersToCreate = [
      {
        title: "Power paint & HVLP sprayers",
        price: 101.2,
        inventory: 5,
        image_name: "sprayer.jpg",
      },
      {
        title: "AMOLEN Wood Walnut PLA",
        price: 25.75,
        inventory: 10,
        image_name: "wood_filament.jpg",
      },
      {
        title: "Four outlet extension cord",
        price: 21.55,
        inventory: 51,
        image_name: "extension_plugs.jpg",
      },
      {
        title: "Green Shield, Shade Clot Plastic Clips",
        price: 12.75,
        inventory: 300,
        image_name: "tie_down_clips.jpg",
      },
      {
        title: "3D Printer",
        price: 150.0,
        inventory: 115,
        image_name: "3d_printer.jpg",
      },
      {
        title: "Li-Ion Battery Pack",
        price: 15.75,
        inventory: 85,
        image_name: "battery_packs.jpeg",
      },
      {
        title: "GoPro Camera",
        price: 250.0,
        inventory: 75,
        image_name: "gopro.jpeg",
      },
      {
        title: "Model Paints",
        price: 2.5,
        inventory: 135,
        image_name: "model_paints.jpg",
      },
      {
        title: "Modeling Tools",
        price: 35.0,
        inventory: 65,
        image_name: "modeling_tools.jpg",
      },
      {
        title: "Paint Booth",
        price: 75.0,
        inventory: 35,
        image_name: "paint_booth.jpeg",
      },
      {
        title: "Air Compressor",
        price: 115.0,
        inventory: 27,
        image_name: "portable_air_compressor.jpg",
      },
      {
        title: "Radio-Control QuadCopter",
        price: 350.0,
        inventory: 16,
        image_name: "quadcopter.jpeg",
      },
      {
        title: "Radio",
        price: 145.0,
        inventory: 23,
        image_name: "radio.jpeg",
      },
      {
        title: "RC Buggy",
        price: 225.0,
        inventory: 32,
        image_name: "rc_buggy.jpeg",
      },
      {
        title: "RC Helicopter",
        price: 325.0,
        inventory: 12,
        image_name: "rc_helicopter.jpeg",
      },
      {
        title: "RC Airplane",
        price: 275.0,
        inventory: 18,
        image_name: "rc_plane.jpeg",
      },
    ];
    await Promise.all(ordersToCreate.map(createItem));

    console.log("Finished creating initial items!");
  } catch (error) {
    console.error("Error creating initial items!");
    throw error;
  }
}

async function createInitialOrderItem() {
  console.log("Starting to create items...");
  try {
    const ordersToCreate = [
      {
        itemId: 1,
        orderId: 1,
        orderPrice: 202.4,
        qty: 2,
      },
      {
        itemId: 2,
        orderId: 1,
        orderPrice: 77.25,
        qty: 3,
      },
      {
        itemId: 3,
        orderId: 3,
        orderPrice: 21.55,
        qty: 1,
      },
      {
        itemId: 4,
        orderId: 2,
        orderPrice: 127.5,
        qty: 10,
      },
      {
        itemId: 2,
        orderId: 2,
        orderPrice: 25.75,
        qty: 1,
      },
      {
        itemId: 1,
        orderId: 3,
        orderPrice: 506.0,
        qty: 5,
      },
    ];
    await Promise.all(ordersToCreate.map(attachItemToOrder));

    console.log("Finished creating initial order_item!");
  } catch (error) {
    console.error("Error creating initial order_item");
    throw error;
  }
}

async function createInitialCategories() {
  console.log("Starting to create categories!");
  try {
    const ordersToCreate = [
      {
        name: "3D Printing",
      },
      {
        name: "Paint Guns",
      },
      {
        name: "Home Electronics",
      },
      {
        name: "Out Door Equipment",
      },
    ];
    await Promise.all(ordersToCreate.map(createCategory));

    console.log("Finished creating initial Categories!");
  } catch (error) {
    console.error("Error creating initial Categories");
    throw error;
  }
}

async function createItemCategoryLinks() {
  console.log("Starting to create categories!");
  try {
    const ordersToCreate = [
      {
        itemId: 1,
        categoryId: 2,
      },
      {
        itemId: 2,
        categoryId: 3,
      },
      {
        itemId: 3,
        categoryId: 1,
      },
      {
        itemId: 4,
        categoryId: 4,
      },
    ];
    await Promise.all(ordersToCreate.map(attachItemToCategory));

    console.log("Finished creating item_category lines!");
  } catch (error) {
    console.error("Error creating item_category link");
    throw error;
  }
}
async function populateDB() {
  try {
    await createInitialUsers();
    await createInitialOrders();
    await createInitialItems();
    await createInitialOrderItem();
    await createInitialCategories();
    await createItemCategoryLinks();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

export { populateDB };
