import { client } from "./client.js";

async function createItem({ title, price, inventory, image_name }) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            INSERT INTO items
            (title, price, inventory, image_name)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
      [title, price, inventory, image_name]
    );

    return item;
  } catch (error) {
    console.error(`db error Creating Item: ${error}`);
  }
}

async function updateItem(id, ...fields) {
  let dataArray = Object.values(fields[0]);
  const setString = Object.keys(fields[0])
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  const sql = `
            UPDATE items
            SET ${setString}
            WHERE id=$${dataArray.length + 1}
            RETURNING *;
            `;
  dataArray.push(id);
  console.log("DATA_ARRAY: ", dataArray)

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [item],
    } = await client.query(sql, dataArray);
console.log("db ITEM: ", item)
    return item;
    
  } catch (error) {
    console.error(`Item Update ERROR: ${error}`);
  }
}

async function getAllItems() {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM items
            `
    );
    return rows;
  } catch (error) {
    console.error(`db error getting all items: ${error}`);
  }
}

async function getItemById(id) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            SELECT *
            FROM items
            WHERE id = $1; 
            `,
      [id]
    );

    return item;
  } catch (error) {
    console.error(`db error getting item by id: ${error}`);
  }
}

async function getItemByTitle(title) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            SELECT *
            FROM items
            WHERE title = $1;
            `,
      [title]
    );

    return item;
  } catch (error) {
    console.error(`db error getting item by title: ${error}`);
  }
}

async function getItemByCategory(categoryId) {
  try {
    const { rows } = await client.query(
      `
            SELECT items.*
            FROM items
            JOIN item_category ON items.id = item_category."item_id"
            WHERE item_category."category_id" = $1;  
            `,
      [categoryId]
    );

    return rows;
  } catch (error) {
    console.error(`db error getting items by category ${error}`);
  }
}

async function attachItemToOrder({ itemId, orderId, orderPrice, qty }) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO ordered_items
            ("itemId", "orderId", "orderPrice",  qty) 
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
      [itemId, orderId, orderPrice, qty]
    );

    return rows;
  } catch (error) {
    console.error(`db error attaching item to order: ${error}`);
  }
}

async function removeItemFromOrder(id) {
  try {
    const { rows } = await client.query(
      `
            DELETE FROM ordered_items
            WHERE id = $1
            RETURNING *;
            `,
      [id]
    );

    return rows;
  } catch (error) {
    console.error(`db error removing item from order: ${error}`);
  }
}

async function updateItemQtyInOrder(id, qty) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
      UPDATE ordered_items
      SET qty = $1
      WHERE id = $2
      RETURNING *;
      `,
      [qty, id]
    );

    return item;
  } catch (error) {
    console.error(`db error updating item qty in order: ${error}`);
  }
}

async function attachItemToCategory({ itemId, categoryId }) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO item_category
            ("item_id", "category_id")
            VALUES ($1, $2)
            RETURNING *;  
            `,
      [itemId, categoryId]
    );

    return rows;
  } catch (error) {
    console.error(`db error attaching item to category: ${error}`);
  }
}

async function removeItemFromCategory({ itemId, categoryId }) {
  try {
    const { rows } = await client.query(
      `
            DELETE FROM item_category
            WHERE "item_id" = $1 AND "category_id" = $2
            RETURNING *; 
            `,
      [itemId, categoryId]
    );

    return rows;
  } catch (error) {
    console.error(`db error removing item from category: ${error}`);
  }
}

async function itemInCategory({ itemId, categoryId }) {
  const data = [itemId, categoryId];
  const sql = `SELECT * FROM item_category WHERE item_id = $1 AND category_id = $2;`;
  const { rows: item_category } = await client.query(sql, data);

  //if row === 0 then there are no records.  so result is the item is NOT in the category
  const result = item_category.length === 0 ? false : true;

  return result;
}

async function deleteItem(itemId) {
  console.log(`itemId from deleteItem:`, itemId);
  try {
    await client.query(
      `
      DELETE FROM item_category
      WHERE item_id=$1
      `,
      [itemId]
    );

    await client.query(
      `
      DELETE FROM ordered_items
      WHERE "itemId"=$1
      `,
      [itemId]
    );

    const {
      rows: [item],
    } = await client.query(
      `
      DELETE FROM items
      WHERE id = $1
      RETURNING *; 
      `,
      [itemId]
    );

    return item;
  } catch (error) {
    console.error(`db error deleting an item: ${error}`);
  }
}

export {
  createItem,
  updateItem,
  getAllItems,
  attachItemToOrder,
  removeItemFromOrder,
  getItemById,
  getItemByTitle,
  getItemByCategory,
  attachItemToCategory,
  removeItemFromCategory,
  itemInCategory,
  deleteItem,
  updateItemQtyInOrder,
};
