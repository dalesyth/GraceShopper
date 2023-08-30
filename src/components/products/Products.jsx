import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { getAllItems } from "../ApiCalls";

const Products = () => {
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
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false}>
          <div className="p-4">
            <Typography variant="h4" color="red">
              Product Management
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="flex overflow-scroll px-0">
          {/* ToDo: add pagination to the table */}
          <table className="table-auto border-collapse  border-slate-300 border-2 m-8 p-2">
            <thead>
              <tr className="border-2">
                <th>Image </th>
                <th>Title</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Category</th>
                <th>Edit</th>
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
                    <td className="border-2">{item.title}</td>
                    <td className="border-2 text-center">{`$${item.price}`}</td>
                    <td className="border-2 ">{item.inventory}</td>
                    <td className="border-2 ">C</td>
                    <td className=" border-b border-gray-50 place-content-center">
                      <Link
                        to={`/products/update/`}
                        className="float-right hover:text-blue-600"
                      >
                        <IconButton variant="text">
                          <img
                            src={"../../src/assets/kisspng-computer-icons-drawing-icon.png"}
                            alt="edit icon"
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
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
        </CardFooter>
      </Card>
    </>
  );
};

export default Products;
