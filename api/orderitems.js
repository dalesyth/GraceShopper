import express from "express";
const orderItemsRouter = express.Router();
import { attachItemToOrder } from "../db/items.js";

orderItemsRouter.post("/orderitems", async (req, res, next) => {
  const { itemId, orderId, orderPrice, qty } = req.body;
  try {
    const attachItem = await attachItemToOrder({
      itemId,
      orderId,
      orderPrice,
      qty,
    });

    res.send(attachItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { orderItemsRouter };
