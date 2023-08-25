import { useState, useEffect } from "react";
import { getCartByUserId, getUserByUsername } from "./ApiCalls";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      const username = JSON.parse(localStorage.getItem("username"));
      const userInfo = await getUserByUsername(username);
      const userId = userInfo.id;

      try {
        const response = await getCartByUserId(userId);

        setCartItems(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getCart();
  }, []);

  return <div>Cart</div>;
};

export default Cart;
