import express from "express";

const router = express.Router();

// ROUTER: /api/users
import { usersRouter } from "./users.js";
router.use("/users", usersRouter);

// ROUTER: /api/orders
import { ordersRouter } from "./orders.js";
router.use("/orders", ordersRouter);

// ROUTER: /api/items
import { itemsRouter } from "./items.js";
router.use("/items", itemsRouter);

// ROUTER: /api/categories
import { categoriesRouter } from "./categories.js";
router.use("/categories", categoriesRouter);

export { router };
