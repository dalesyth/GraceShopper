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
        console.log(`response from getItems: ${response}`);
        setItems(response);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);

  return <div>GraceShopper Home</div>;
};

export default Home;
