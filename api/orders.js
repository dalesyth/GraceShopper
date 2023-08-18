import express from "express";
import { useParams } from "react-router-dom";
const ordersRouter = express.Router();

import {
  createOrder,
  getAllOpenOrders,
  getOrderById,
  getOrderByUser,
  deleteOrder,
} from "./db/orders";
import { itemsRouter } from "./items";

//POST/api/orders

ordersRouter.post("/", async (req, res, next)=> {
    
 const request =  object.value(req.body)
    try {
        const newOrder = await createOrder(request);
        // *****If error try changing to destructure all fields for orders from db*****
        res.send(newOrder);
    } catch (error) {
    next;
    }
    
})

// GET/api/orders

itemsRouter.get("/", async (req, res, next) => {
    try {
        const allOpenOrders = await getAllOpenOrders();

        res.send(allOpenOrders);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// GET/api/orders/:orderid
getOrderById();

// PATCH/api/orders/:orderid
getOrderByUser();

// DELETE/api/orders/:orderid
deleteOrder();

export { ordersRouter };
