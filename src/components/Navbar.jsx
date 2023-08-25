import { Link } from "react-router-dom";


const Navbar = () => {
  
  const loginLink = localStorage.getItem("token")? 
      <Link to="/LogOut" className="no-underline p-6 hover:text-blue-600">Logout</Link>
      :
      <Link to="/login" className="no-underline p-6     hover:text-blue-600">Login</Link>;
    
  
  return (
    <nav className="navbar p-8 flex justify-between items-center max-w-screen-lg mx-auto border-b border-gray-200 bg-gray-200 shadow-lg">
      <h1 className="text-pink-600 text-xl font-bold">Graceshopper</h1>
      <div className="links">
        <Link
          to="/Home"
          className="no-underline p-6 hover:text-blue-600"
        >
          Home
        </Link>
        <Link to="/cart" className="no-underline p-6 hover:text-blue-600">
          Cart
        </Link>
        {loginLink}
       
      </div>
    </nav>
  );
};

export default Navbar;
