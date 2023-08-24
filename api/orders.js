import express from "express";
const ordersRouter = express.Router();

import {
  createOrder,
  getAllOpenOrders,
  getOrderById,
  deleteOrder,

} from "../db/orders.js";


//POST/api/orders

ordersRouter.post("/", async (req, res, next) => {
  
  try {
    const newOrder = await createOrder(req.body);
   
    console.log(`newOrder: ${newOrder}`)
    res.send(newOrder);
  } catch ({ name, message }) {

    next({ name, message });
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
 const { orderid } = req.params;
 try {
   const orderById = await getOrderById(orderid);

   res.send(orderById);
 } catch ({ name, message }) {
   next({ name, message });
 }
});

// GET/api/orders/orderuser/:orderUser - Get order by User

// ordersRouter.get("/orderuser/:orderUser", async ( req, res, next) => {
//     const orderUser = req.params; })

 // GET/api/orders/orderuser/:user_id - GET order by user_id
 
 ordersRouter.get("/orderuser/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orderByUserId = await getOrderByUserId(userId);

    res.send(orderByUserId);
  } catch ({ name, message }) {
    next({ name, message })
  }
 })

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
