import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getItemById } from "../ApiCalls";
import { deleteProduct } from "./ProductHelpers";

const DeleteProduct = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    console.log(`id from handleDelete:`, id);
    try {
      await deleteProduct(id);

      navigate("/products");
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
              src={`/${item.image_name}`}
              alt={item.title}
              className="w-3/4 h-3/4"
            />
          </div>

          <div className="item-details flex justify-center items-center flex-col">
            <div>
              <h2 className="font-bold pb-2">{item.title}</h2>
              <div className="pb-2">Price: ${item.price}</div>
              <div className="mb-8">Current Inventory: {item.inventory}</div>
            </div>
            <div>
              <p className="font-bold">
                Remove this product from the database?
              </p>
            </div>
            <div className="flex justify-evenly w-1/2">
              <button
                className="bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
              <Link
                to={`/products`}
                className="bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
};

export default DeleteProduct;
