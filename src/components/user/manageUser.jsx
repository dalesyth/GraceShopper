import { getAllUsers } from "./userHelpers";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
     Typography,
  Button,
  IconButton,
 } from "@material-tailwind/react";

const Users = () => {
  const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  console.log("Users page loaded");

  useEffect(() => {
    const getUsers = async () => {
        
      try {
        const response = await getAllUsers();
        setUsers(response);
        console.log(response);

        setUsers(response);
        // setIsLoading(false);
      } catch (error) {
        console.error(error);
        // setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <div className="flex-col rounded-lg h-5/6 w-max bg-gray-200">
        
        <div
          id="title"
          className="p-4 pb-0 bg-gray-200 font-bold rounded-lg text-3xl"
        >
          Manage Users
           
        </div>
        
        <div id="body" className="m-4 p-2 overflow-scroll ">
          {/* ToDo: use <div>s for table instead of table tags */}
          {/* ToDo: add pagination to the table */}
          <table className="table-auto ">
            <thead>
              <tr>
                <th className="px-4"> </th>
                <th>Username</th>
                <th>Role</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index} className="border-2 ">
                    
                    <td className="border-2 px-2">{user.index}</td>
                    <td className="border-2 px-2">{user.username}</td>
                    <td className="border-2 px-2">{`${user.role}`}</td>
                    <td className="border-2 px-2">{user.email}</td>

                    <td className=" border-2 pl-3">
                      <Link
                        to={`/products/${user.id}/update`}
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
            Page 1 of 2
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
            <Link to={("/admin")} type="text" className="flex gap-2 items-center justify-between font-bold hover:text-gray-400">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
