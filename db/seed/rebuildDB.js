import { dropTables, createTables } from "./createTables.js";
import { populateDB } from "./seedData.js";

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await populateDB();
    
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

export { rebuildDB };