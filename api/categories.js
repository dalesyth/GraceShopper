import express from "express";
const categoriesRouter = express.Router();
import {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  deleteCategory,
  getCategoryByItem,
} from "../db/categories.js";

// GET ROUTES

// GET /api/categories - GET all categories
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const allCategories = await getAllCategories();

    res.send(allCategories);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/categories/:categoryId - GET category by ID
categoriesRouter.get("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const categoryById = await getCategoryById(categoryId);

    res.send(categoryById);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/categories/:categoryName - GET category by Name
categoriesRouter.get("/:categoryName", async (req, res, next) => {
  const { categoryName } = req.params;
  console.log(`categoryName: ${categoryName}`)
  

  try {
    const categoryByName = await getCategoryByName(categoryName);

    res.send(categoryByName);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/categories/:categoryItem - Get all categories with a particular item
categoriesRouter.get("/:categoryItem", async (req, res, next) => {
  const { categoryItem } = req.params;

  try {
    const categoryByItem = await getCategoryByItem(categoryItem);

    res.send(categoryByItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST ROUTES

// POST /api/categories - Create a new Category
categoriesRouter.post("/", async (req, res, next) => {
  const { name } = req.body;

  const existingCategory = await getCategoryByName(name);

  if (!existingCategory) {
    try {
      const newCategory = await createCategory(name);

      res.send(newCategory);
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "categoryExistsError",
      message: `A category with name ${name} already exists`,
    });
  }
});

// PATCH ROUTES

// PATCH /api/categories/:categoryId - Update an existing category
categoriesRouter.patch("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;

  const { name } = req.body;

  const existingCategoryId = await getCategoryById(categoryId);

  const existingCategoryName = await getCategoryByName(name);

  if (!existingCategoryId) {
    next({
      name: "categoryDoesNotExistError",
      message: `Category ${categoryId} not found`,
    });
  }

  if (existingCategoryName) {
    next({
      name: "categoryNameAlreadyExistsError",
      message: `A category with name ${name} already exists`,
    });
  }

  try {
    const updatedCategory = await updateCategory(categoryId, name);

    res.send(updatedCategory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE ROUTES

// DELETE /api/categories/:categoryId - Delete a category by ID
categoriesRouter.delete("/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await deleteCategory(categoryId);

    res.send(deletedCategory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { categoriesRouter };
