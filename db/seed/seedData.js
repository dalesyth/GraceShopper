import { createUser } from "../users/createUser.js";
import { createOrder } from "../orders.js";
async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
    { username: 'albert',
      password: 'soxAreGreat',
      email: 'albert@myurl.com',
      first_name: 'albert',
      last_name: 'soxs',
      address_1: '353 My Street',
      address_2: 'apt. 2',
      city: 'Hit',
      state: 'IA',
      zip_code: 50613,
      country: 'USA',
      shipping_address_1: '250 Yourstreet',
      shipping_address_2: null,
      shipping_city: 'Mantua',
      shipping_state: 'UT',
      shipping_zip_code: 84324,
      shipping_counry: 'USA'
    }    
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
    ];
    await Promise.all(ordersToCreate.map(createOrder));

    console.log("Finished creating initial orders!");
  } catch (error) {
    console.error("Error creating initial orders!");
    throw error;
  }
}

async function createInitialItems() {
  console.log("Starting to create Orders...");
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
        image_name: "extension_plugs.jpg",
      },
    ];
    await Promise.all(ordersToCreate.map(createItem));

    console.log("Finished creating initial orders!");
  } catch (error) {
    console.error("Error creating initial orders!");
    throw error;
  }
}

  async function populateDB() {
    try {
      await createInitialUsers();
      await createInitialOrders();
      await createInitialItems();
    } catch (error) {
      console.log("Error during rebuildDB");
      throw error;
    }
  }



export { populateDB };
