import { client } from "./client.js";
//import { createTables } from './createTables.js'
import { populateDB } from "./seedData.js";

async function rebuildDB() {
  try {
    populateDB();
    //await createTables();
   
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
