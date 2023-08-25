import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getItemById,
  getUserByUsername,
  createNewOrder,
  addItemToOrder,
  getOrderByUserId,
} from "./ApiCalls";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const response = await getItemById(itemId);
        setItem(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getItemDetail();
  }, [itemId]);

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = async () => {
    const username = JSON.parse(localStorage.getItem("username"));
    const userInfo = await getUserByUsername(username);
    const userId = userInfo.id;
    const userEmail = userInfo.email;
    const userOrder = await getOrderByUserId(userId);

    console.log(`userOrder.id: ${userOrder.id}`);
    const userOrderId = userOrder.id;
    console.log(`userOrder.checkout_complete: ${userOrder.checkout_complete}`);

    if (!userOrder || userOrder.checkout_complete) {
      console.log("IF stmt is truthy, createNewOrder");
      try {
        const response = await createNewOrder({
          userId,
          userEmail,
        });

        console.log(`response.id from createNewOrder: ${response.id}`);
        console.log(`response.email from createNewOrder: ${response.email}`);
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const orderPrice = quantity * item.price;

      const response = await addItemToOrder({
        itemId,
        userOrderId,
        orderPrice,
        quantity,
      });

      console.log(`response from addItemToOrder: ${response}`);
      alert(`${item.title} has been added to your cart!`);
      setQuantity("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : item ? (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-200 w-1/2 h-1/2 rounded-lg shadow-lg">
          <h2 className="font-bold pb-2">{item.title}</h2>
          <div>Price: ${item.price}</div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantity}
            ></input>
          </div>
          <div>
            <button
              className="bg-blue-400 text-white font-bold px-0.5 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
};

export default ItemDetail;
