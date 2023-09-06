import { Link } from "react-router-dom";

const Navbar = () => {
  const role = JSON.parse(localStorage.getItem("role"));
  const adminLink = role == "admin" ? (
      <Link to="/admin" className="no-underline p-6 hover:text-blue-600">
        Admin
      </Link>) : null;

  const loginLink = localStorage.getItem("token") ? (
    <Link to="/logout" className="no-underline p-6 hover:text-blue-600">
      Logout
    </Link>
  ) : (
    <Link to="/login" className="no-underline p-6     hover:text-blue-600">
      Login
    </Link>
  );

  return (
    <nav className="navbar p-8 flex justify-between items-center w-screen mx-auto border-b border-gray-200 bg-gray-200 shadow-lg font-bold text-lg">
      <h1 className="text-pink-600 text-3xl font-bold">Graceshopper</h1>
      <div className="links">
        <Link to="/home" className="no-underline p-6 hover:text-blue-600">
          Home
        </Link>
        <Link to="/cart" className="no-underline p-6 hover:text-blue-600">
          Cart
        </Link>
        {adminLink}
        {loginLink}
      </div>
    </nav>
  );
};

export default Navbar;
