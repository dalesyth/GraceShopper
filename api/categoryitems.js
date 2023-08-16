import express from "express";
const itemCategoryRouter = express.Router();
import {
  attachItemToCategory,
  removeItemFromCategory,
  itemInCategory,
} from "./db/items.js";


// POST ROUTES

// POST /api/categoryitems - Add item to category.
itemCategoryRouter.post("/", async (req, res, next) => {
  const { itemId, categoryId } = req.body;

  const itemAlreadyInCategory = await itemInCategory({ itemId, categoryId });

  if (!itemAlreadyInCategory) {
    try {
      const newItem = await attachItemToCategory({ itemId, categoryId, });

      res.send(newItem);
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "Item in Category",
      message: `This item already exisits in this category`,
    });
  }
});

// PATCH ROUTES

// PATCH /api/items/:itemId - Update an existing item
itemsRouter.patch("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;

  const { title, price, inventory, image_name } = req.body;

  const updateFields = {};

  if (itemId) {
    updateFields.id = itemId;
  }

  if (title) {
    updateFields.title = title;
  }

  if (price) {
    updateFields.price = price;
  }

  if (inventory) {
    updateFields.inventory = inventory;
  }

  if (image_name) {
    updateFields.image_name = image_name;
  }

  const existingItemId = await getItemById(itemId);

  const existingItemTitle = await getItemByTitle(title);

  if (!existingItemId) {
    next({
      name: "itemIdDoesNotExistError",
      message: `Item ${itemId} not found`,
    });
  }

  if (existingItemTitle) {
    next({
      name: "itemTitleAlreadyExistsError",
      message: `An item with title ${title} already exists`,
    });
  }

  try {
    const updatedItem = await updateItem(updateFields);

    res.send(updatedItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { itemCategoryRouter };
