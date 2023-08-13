import { client } from "../client.js";
import { rebuildDB } from "./rebuildDB.js";

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
