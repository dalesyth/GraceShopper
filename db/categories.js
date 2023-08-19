/* eslint-disable */
import { client } from "./client.js";

// Create a new category
async function createCategory(name) {
  
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            INSERT INTO category
            (name)
            VALUES ($1)
            RETURNING *;  
            `,
      [name]
    );

    return category;
  } catch (error) {
    throw error;
  }
}

// Update a category
async function updateCategory(id, name) {
  console.log(`updateCategory id: ${id}, name: ${name}`)
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            UPDATE category
            SET name = $2
            WHERE id = $1
            RETURNING *;
            `,
      [id, name]
    );

    return category;
  } catch (error) {
    throw error;
  }
}

// Get all categories
async function getAllCategories() {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM category
            `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get a category by id
async function getCategoryById(id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            SELECT *
            FROM category
            WHERE id = $1;   
            `,
      [id]
    );

    return category;
  } catch (error) {
    throw error;
  }
}

// Get a category by name
async function getCategoryByName(name) {
  
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            SELECT *
            FROM category
            WHERE name = $1  
            `,
      [name]
    );
    
    return category;
  } catch (error) {
    throw error;
  }
}

// Get all categories that contain a given item
async function getCategoryByItem(itemId) {
  try {
    const { rows } = await client.query(
      `
            SELECT category.*
            FROM category
            JOIN item_category ON category.id = item_category."category_id"
            WHERE item_category."item_id" = $1;
            `,
      [itemId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

// Delete a category
async function deleteCategory(id) {
  try {
    const { rows } =
    await client.query(
      `
            DELETE FROM category
            WHERE id = $1
            RETURNING *; 
            `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }

}

export {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  deleteCategory,
  getCategoryByItem,
};
