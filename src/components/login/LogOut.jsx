import { Link } from "react-router-dom";
import { logout } from "./loginHelpers";


const LogOut = () => {
  logout();
  return (
    <>
      <div className="bg-black/50 fixed top-0 left-0 w-full h-screen">
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[250px] rounded mx-auto bg-black/80 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <label className="text-red-600  text-2xl">
                Your have been logged Out!
              </label>
              <div>
                <br />
                <Link to={`/`}>Home</Link>
                <Link to={`/Register`} className="float-right">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOut;
