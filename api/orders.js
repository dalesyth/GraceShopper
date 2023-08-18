import express from "express";
const ordersRouter = express.Router();

import {
  createOrder,
  getAllOpenOrders,
  getOrderById,
  getOrderByUser,
  deleteOrder,

} from "../db/orders.js";
import { itemsRouter } from "./items.js";

//POST/api/orders

ordersRouter.post("/", async (req, res, next) => {
  const request = Object.values(req.body);
  try {
    const newOrder = await createOrder(request);
    // *****If error try changing to destructure all fields for orders from db*****
    res.send(newOrder);
  } catch (error) {

    next;
  }
});

// GET/api/orders


ordersRouter.get("/", async (req, res, next) => {
    try {
        const allOpenOrders = await getAllOpenOrders();



    res.send(allOpenOrders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET/api/orders/:orderid - Get order by Id

ordersRouter.get("/:orderid", async (req, res, next) => {
 const orderId = req.params;

 try {
   const orderById = await getOrderById(orderId);

   res.send(orderById);
 } catch ({ name, message }) {
   next({ name, message });
 }
});

// GET/api/orders/:orderUser - Get order by User

ordersRouter.get("/:orderUser", async ( req, res, next) => {
    const orderUser = req.params; })

// PATCH/api/orders/:orderid

// DELETE/api/orders/:orderid - Delete an order by Id
ordersRouter.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await deleteOrder(orderId);

    res.send(deletedOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { ordersRouter };
