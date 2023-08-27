import express from "express";
const orderItemsRouter = express.Router();
import {
  attachItemToOrder,
  removeItemFromOrder,
  updateItemQtyInOrder,
} from "../db/items.js";

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
    next({ name, message });
  }
});

orderItemsRouter.patch("/:orderItemId", async (req, res, next) => {
  const { orderItemId } = req.params;
  const { qty } = req.body;

  try {
    const updatedItem = await updateItemQtyInOrder(orderItemId, qty);

    res.send(updatedItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { orderItemsRouter };
