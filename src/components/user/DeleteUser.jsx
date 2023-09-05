import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteUser, getUserByUserId } from "./userHelpers";

const DeleteUser = () => {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserByUserId(userId);
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [userId]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);

      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex-col rounded-lg h-100 w-max bg-gray-200">
        <div id="body" className="m-4 p-2 overflow-scroll ">
          {user ? (
            <>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4"> </th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-2">
                    <td className="border-2 px-2">1</td>
                    <td className="border-2 px-2">{user.username}</td>
                    <td className="border-2 px-2">{`${user.role}`}</td>
                    <td className="border-2 px-2">{user.email}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p className="font-bold bg-yellow-300 rounded-lg p-3">
                  Remove this user from the database?
                </p>
              </div>
              <div className="flex justify-evenly w-1/2">
                <button
                  className="bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                <Link
                  to={`/users`}
                  className="bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                >
                  Cancel
                </Link>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
