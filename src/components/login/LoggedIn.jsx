import { Link } from "react-router-dom";

const LoggedIn = () => {
  return (
    <>
      HI
      {/* 
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
            <p className="text-slate-500">You have a new message!</p>
          </div> 
        </div>
      */}
      <label className="text-red-600  text-5xl">Already Logged In!</label>;
      <div>
        <Link to={`/home`}>Cancel</Link>
        <Link to={`/register`} className="float-right"> 
          Register
        </Link>
      </div>
    </>
  );
};

export default LoggedIn;
