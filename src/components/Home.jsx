import React, { useState, useEffect } from "react";
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
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="border p-4 bg-gray-200">
              <h2 className="font-bold pb-2">{item.title}</h2>
              <div className="pb-2">Price: {item.price}</div>
              <Link
                to={`/itemdetail/${item.id}`}
                className="bg-blue-400 text-white font-bold px-0.5 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold"
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
