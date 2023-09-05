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
    try {
      console.log(`userInfo.id: ${userInfo.id}`);
      const userId = userInfo.id;
      const userEmail = userInfo.email;

      const userOrder = await getOrderByUserId(userId);

      if (!userOrder || userOrder.checkout_complete) {
        console.log("IF stmt is truthy, createNewOrder");
        try {
          const response = await createNewOrder({
            userId,
            userEmail,
          });

          console.log(`response.id from createNewOrder: ${response.id}`);
          console.log(`response.email from createNewOrder: ${response.email}`);
          const userOrderId = response.id;
          const orderPrice = quantity * item.price;

          await addItemToOrder({
            itemId,
            userOrderId,
            orderPrice,
            quantity,
          });

          console.log(`response from addItemToOrder: ${response}`);
          alert(`${item.title} has been added to your cart!`);
          setQuantity(1);
        } catch (error) {
          console.error(error);
        }
      } else if (userOrder && userOrder.id) {
        const orderPrice = quantity * item.price;

        const response = await addItemToOrder({
          itemId,
          userOrderId: userOrder.id,
          orderPrice,
          quantity,
        });

        console.log(`response from addItemToOrder: ${response}`);
        alert(`${item.title} has been added to your cart!`);
        setQuantity(1);
      } else {
        console.log("userOrder is undefined or doesn't have an id");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : item ? (
        <div className="detail-container grid grid-cols-2 bg-gray-200 rounded-lg shadow-lg h-2/5 w-4/5">
          <div className="photo-container flex justify-center items-center">
            <img
              src={`../public/${item.image_name}`}
              alt={item.title}
              className="w-3/4 h-3/4"
            />
          </div>

          <div className="item-details flex justify-center items-center flex-col">
            <div>
              <h2 className="font-bold pb-2">{item.title}</h2>
              <div className="pb-2">Price: ${parseFloat(item.price).toFixed(2)}</div>
              <div>
                <label className="mr-2" htmlFor="quantity">
                  Quantity:
                </label>
                <input
                  className="w-12 text-center"
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantity}
                ></input>
              </div>
            </div>
            <div>
              <button
                className="bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
};

export default ItemDetail;
