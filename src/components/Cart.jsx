import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartByUserId,
  getUserByUsername,
  removeItemFromOrder,
  updateQtyInOrder,
} from "./ApiCalls";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const cartTotal = cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.ordered_items_total),
    0
  );

  const handleRemoveItem = async (id) => {
    console.log(`id from handleRemoveItem: ${id}`);

    try {
      const response = await removeItemFromOrder(id);
      console.log(`response from handleRemoveItem: ${response}`);
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.ordered_items_id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (id, updateQty) => {
    try {
      await updateQtyInOrder(id, updateQty);
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.ordered_items_id === id
            ? { ...item, 
              ordered_items_qty: updateQty,
              ordered_items_total: item.price * updateQty }
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    navigate(`/checkout/${cartTotal}`);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="flex-col justify-between">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border p-4 bg-gray-200 flex justify-between shadow-lg mb-2"
            >
              <span>
                <img
                  src={`../public/${item.image_name}`}
                  alt={item.title}
                  className="w-32 h-32"
                />
              </span>
              <span className="font-bold">{item.title}</span>
              <span>${item.ordered_items_total}</span>
              <span>
                Quantity:{" "}
                <input
                  type="number"
                  value={item.ordered_items_qty}
                  onChange={(event) =>
                    handleQuantityChange(
                      item.ordered_items_id,
                      event.target.value
                    )
                  }
                ></input>
              </span>

              <button
                className="h-10 bg-blue-400 text-white font-bold px-1 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={() => handleRemoveItem(item.ordered_items_id)}
              >
                Remove from Cart
              </button>
            </div>
          ))}
          <div className="flex justify-end my-3">
            <span className="font-bold">Cart Total: ${cartTotal}</span>
          </div>
          <div className="flex justify-end my-3">
            <button
              className="h-10 bg-yellow-400 text-black font-bold px-1 py-1 rounded-lg hover:bg-yellow-600 hover:font-extrabold shadow-lg"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
