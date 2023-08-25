import express from "express";

const apiRouter = express.Router();

// GET /api/health
apiRouter.get("/health", async (req, res, next) => {
  res.send({ message: "All is well" });
});

// ROUTER: /api/users
import { usersRouter } from "./users.js";
apiRouter.use("/users", usersRouter);

// ROUTER: /api/orders
import { ordersRouter } from "./orders.js";
apiRouter.use("/orders", ordersRouter);

// ROUTER: /api/items
import { itemsRouter } from "./items.js";
apiRouter.use("/items", itemsRouter);

// ROUTER: /api/categories
import { categoriesRouter } from "./categories.js";
apiRouter.use("/categories", categoriesRouter);

// ROUTER: /api/itemCategoryRouter
import { itemCategoryRouter } from "./categoryitems.js";
apiRouter.use("/categoryitems", itemCategoryRouter);

// ROUTER: /api/orderItemsRouter
import { orderItemsRouter } from "./orderitems.js";
apiRouter.use("/orderitems", orderItemsRouter);

// ROUTER: /api/cartRouter
import { cartRouter } from "./cart.js";
apiRouter.use("/cart", cartRouter);

// ERROR HANDLER

apiRouter.use((error, req, res, next) => {
  res.status(500).json({
    name: error.name,
    message: error.message,
  });
});

export default apiRouter;
