import { useState } from 'react';
import { Link } from "react-router-dom";
import { login } from "./loginHelpers"
import { useNavigate } from "react-router";
//import { LoggedIn } from "./LoggedIn";



const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }

  const handleSubmitButton = async (event) => {
    event.preventDefault();
    try {
      if (password && username) {
        console.log(`UserName: ${username}, password: ${password}`)
        console.log(`About to log in, Login.jsx`)
        const result = await login(username, password);
        if (result) {
          console.log(`STORED USERNAME: ${JSON.parse(localStorage.getItem("username"))}`);
          console.log(`STORED TOKEN: ${JSON.parse(localStorage.getItem("token"))}`);
        } else {
          window.alert("Login Failed!");
          console.log("Login Failed!");
        }
      }
      navigate("/Home");
    } catch(error) {
      console.error(`Login Error: ${error}`)
    }
  }

  if (!localStorage.getItem("token")) {
    return (
      <>
        <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-screen">
          <div className="flex justify-center items-center  py-24">
            <div className="w-6/12 max-w-[450px] h-100 rounded mx-auto bg-gray-200 ">
              <div className="max-w-[320px] mx-auto py-6">
                <label className="font-bold  text-5xl">Login</label>
                <form className="w-full flex flex-col py-4">
                  <label className="text-xl font-bold">User Name</label>
                  <input
                    type="text"
                    required
                    onChange={handleUserChange}
                    className="p-3 rounded text-black"
                    placeholder="User Name"
                  />
                  <label className="font-bold text-xl  mt-3">Password</label>
                  <input
                    type="password"
                    required
                    className="p-3 rounded text-black"
                    onChange={handlePasswordChange}
                    placeholder="Password"
                  />

                  <button
                    type="submit"
                    onClick={handleSubmitButton}
                    className="bg-gray-700 text-white py-3 mt-6 mb-3 rounded-lg font-bold text-2xl"
                  >
                    Log in
                  </button>
                  <div className="font-bold">
                    <Link to={`/home`}>Cancel</Link>
                    <Link to={`/Register`} className="float-right">
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="flex flex-col h-screen items-center justify-center bg-gray-200 w-8/12 h-24  rounded-lg shadow-lg">
          <h2 className="font-bold pb-2 text-2xl">Already Logged In!</h2>
          <div className="flex space-x-1">
            <Link to={`/LogOut`}>Log Out</Link>
            <div>|</div>
            <Link to={`/home`}>Cancel</Link>
          </div>
        </div>
      </div>
    </>
  ); 
  }
}
//const LoginFailed = () => {

export default Login