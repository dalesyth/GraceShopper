import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllItems } from "./ApiCalls";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await getAllItems();

        setItems(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border p-4 bg-gray-200 rounded-lg shadow-lg"
            >
              <h2 className="font-bold pb-2 flex justify-center">
                {item.title}
              </h2>
              <div className="flex justify-center">
                <img
                  src={`/${item.image_name}`}
                  alt={item.title}
                  className="w-32 h-32"
                />
              </div>
              <div className="pb-2 py-2 flex justify-center">
                Price: ${parseFloat(item.price).toFixed(2)}
              </div>
              <Link
                to={`/item-detail/${item.id}`}
                className="bg-blue-400 text-gray-100 font-bold px-0.5 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold flex justify-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
