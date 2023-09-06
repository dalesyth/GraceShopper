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
      <div className="flex-col rounded-lg h-100 w-max bg-gray-200">
        
        <div
          id="title"
          className="p-4 pb-0 bg-gray-200 font-bold rounded-lg text-3xl"
        >
          Manage Users
           
        </div>
        
        <div id="body" className="m-4 p-2 ">
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
                        // to={`/products/${user.id}/update`}
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
                        to={`/users/${user.id}/delete/`}
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
       
      </div>
    </div>
  );
};

export default Users;
