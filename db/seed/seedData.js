import { createUser } from "../users/createUser.js";

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
    },
        
        
     
    ];
    await Promise.all(usersToCreate.map(createUser));

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function populateDB() {
  try {
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}



export { populateDB };
