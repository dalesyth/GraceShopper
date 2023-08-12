/* 
DO NOT CHANGE THIS FILE
*/
import { client } from './client';
import { rebuildDB }  from './seedData';

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
