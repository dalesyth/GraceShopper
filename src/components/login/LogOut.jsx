import { Link } from "react-router-dom";
import { logout } from "./loginHelpers";


const LogOut = () => {
  logout();
  return (
    <>
      <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-screen">
        <div className="flex justify-center items-center py-24">
          <div className="mx-auto max-w-[450px] h-100 rounded-lg bg-gray-200">
            <div className="font-bold max-w-[320px] mx-auto py-6 px-3">
              <div className="text-center">
                <label className="text-3xl">Your have been logged Out!</label>
              </div>
              <div>
                <br />
                <Link to={`/Home`}>Home</Link>
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
