import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  Button,
  IconButton,
 } from "@material-tailwind/react";
import { getAllItems } from "../ApiCalls";

const Products = () => {
  const [items, setItems] = useState([]);
 //const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await getAllItems();
        setItems(response);
        //setIsLoading(false);
      } catch (error) {
        console.error(error);
        //setIsLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <>
      <div className="flex-col rounded-lg h-5/6 w-max bg-gray-200">
        <div
          id="title"
          className="p-4 pb-0 bg-gray-200 font-bold rounded-lg text-3xl "
        >
          Product Management
        </div>
        <div id="body" className="m-4 p-2 overflow-scroll ">
          {/* ToDo: use <div>s for table instead of table tags */}
          {/* ToDo: add pagination to the table */}
          <table className="table-auto ">
            <thead>
              <tr>
                <th className="px-4">Image </th>
                <th>Title</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index} className="border-2 ">
                    <td className="border-2">
                      <img
                        src={`../public/${item.image_name}`}
                        alt={item.title}
                        className="w-10 h-10 hover:scale-150"
                      />
                    </td>
                    <td className="border-2 px-2">{item.title}</td>
                    <td className="border-2 px-2">{`$${item.price}`}</td>
                    <td className="border-2 px-2">{item.inventory}</td>
                    <td className="border-2 px-2">C</td>
                    <td className=" border-2 pl-3">
                      <Link
                        to={`/products/${item.id}/update`}
                        className="float-right hover:text-blue-600 "
                      >
                        <IconButton variant="text">
                          <img
                            src={
                              "../../src/assets/kisspng-computer-icons-drawing-icon.png"
                            }
                            alt="edit icon"
                            className="w-5 h-5 "
                          />
                        </IconButton>
                      </Link>
                    </td>
                    <td className=" border-2 pl-3">
                      <Link
                        to={`/products/delete/`}
                        className="float-right hover:text-blue-600"
                      >
                        <IconButton variant="text">
                          <img
                            src={
                              "../../src/assets/kisspng-computer-icons-x-icon.png"
                            }
                            alt="Delete Icon"
                            className="w-5 h-5"
                          />
                        </IconButton>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-blue-gray-50 p-4 h-fit">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
