import express from "express";
const cartRouter = express.Router();
import { getCartData } from "../db/cart.js";

// GET ROUTES

// GET /api/cart - Get users cart
cartRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const cartData = await getCartData(userId);

    res.send(cartData);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { cartRouter };
