import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "./ApiCalls";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeOrder, setActiveOrder] = useState(null);

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
    console.log(`You have reached handleAddToCart, quantity is ${quantity}`);

    if (!activeOrder) {
      try {
        const response = await createNewOrder();

        console.log(`response from handleAddToCart: ${response}`);

        setActiveOrder(orderId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : item ? (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-200 w-1/2 h-1/2 rounded-lg shadow-lg">
          <h2 className="font-bold pb-2">{item.title}</h2>
          <div>Price: {item.price}</div>
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
