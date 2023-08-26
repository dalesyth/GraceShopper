import express from "express";
const orderItemsRouter = express.Router();
import { attachItemToOrder, removeItemFromOrder } from "../db/items.js";

orderItemsRouter.post("/", async (req, res, next) => {
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

orderItemsRouter.delete("/:orderItemId", async (req, res, next) => {
  const { orderItemId } = req.params;

  try {
    const deletedItem = await removeItemFromOrder(orderItemId);
    
    res.send(deletedItem);
  } catch ({ name, message }) {
    next({ name, message })
  }
})

export { orderItemsRouter };
