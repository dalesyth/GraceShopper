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
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      const username = JSON.parse(localStorage.getItem("username"));
      
      console.log(`username from cart: ${username}`);
      console.log(`token from cart: ${token}`);
      

      if (token) {
        const userInfo = await getUserByUsername(username);
        const userId = userInfo.id;

        try {
          const response = await getCartByUserId(userId);

          setCartItems(response);
          
        } catch (error) {
          console.error(error);
          
        }
      }

      setIsLoading(false);
    };
    getCart();
  }, [token]);

  const cartTotal = cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.ordered_items_total),
    0
  ).toFixed(2);

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
            ? {
                ...item,
                ordered_items_qty: updateQty,
                ordered_items_total: item.price * updateQty,
              }
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
        <p className="text-gray-100">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-100">Your cart is empty!</p>
      ) : (
        <div className="flex-col justify-between">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border p-4 bg-gray-200 flex justify-between shadow-lg mb-2 rounded-lg"
            >
              <span>
                <img
                  src={`../public/${item.image_name}`}
                  alt={item.title}
                  className="w-32 h-32"
                />
              </span>
              <span className="font-bold">{item.title}</span>
              <span>${parseFloat(item.ordered_items_total).toFixed(2)}</span>
              <span>
                Quantity:{" "}
                <input
                  className="w-12 text-center"
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
                className="h-10 bg-blue-400 text-gray-100 font-bold px-1 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={() => handleRemoveItem(item.ordered_items_id)}
              >
                Remove from Cart
              </button>
            </div>
          ))}
          <div className="flex justify-end my-3">
            <span className="font-bold text-gray-100">
              Cart Total: ${cartTotal}
            </span>
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
