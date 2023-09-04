import express from "express";
const itemsRouter = express.Router();
import {
  createItem,
  updateItem,
  getAllItems,
  getItemById,
  getItemByTitle,
  getItemByCategory,
  deleteItem,
} from "../db/items.js";

//GET ROUTES

// GET /api/items - Gets all items
itemsRouter.get("/", async (req, res, next) => {
  try {
    const allItems = await getAllItems();

    res.send(allItems);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/items/:itemId - Get item by Id
itemsRouter.get("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const itemById = await getItemById(itemId);

    res.send(itemById);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/items/:itemTitle - Get item by Title
itemsRouter.get("/:itemTitle", async (req, res, next) => {
  const { itemTitle } = req.params;

  try {
    const itemByTitle = await getItemByTitle(itemTitle);

    res.send(itemByTitle);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/items/:itemCategory - Get item by Category
itemsRouter.get("/:itemCategory", async (req, res, next) => {
  const { itemCategory } = req.params;

  try {
    const itemByCategory = await getItemByCategory(itemCategory);

    res.send(itemByCategory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST ROUTES

// POST /api/items - Create a new item
itemsRouter.post("/", async (req, res, next) => {
  const { title, price, inventory, image_name } = req.body;

  const existingItem = await getItemByTitle(title);

  if (!existingItem) {
    try {
      const newItem = await createItem({
        title,
        price,
        inventory,
        image_name,
      });

      res.send(newItem);
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "itemExistsError",
      message: `An item with title ${title} already exists`,
    });
  }
});

// PATCH ROUTES

// PATCH /api/items/:itemId - Update an existing item
itemsRouter.patch("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;
  const item = req.body;
  const existingItemId = await getItemById(itemId);

  if (!existingItemId) {
    next({
      name: "itemIdDoesNotExistError",
      message: `Item ${itemId} not found`,
    });
  }

  try {
    const updatedItem = await updateItem(itemId, item);
    res.send(updatedItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE ROUTES

// DELETE /api/items/:itemId - Delete an item by Id
itemsRouter.delete("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const deletedItem = await deleteItem(itemId);

    res.send(deletedItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { itemsRouter };
