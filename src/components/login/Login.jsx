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
    return(
    <>
      <div className="bg-black/50 fixed top-0 left-0 w-full h-screen">
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[450px] rounded mx-auto bg-black/80 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <label className="text-red-600  text-5xl">Login</label>
              <form className="w-full flex flex-col py-4">
                <label className="text-white font-bold">User Name</label>
                <input
                  type="text"
                  required
                  onChange={handleUserChange}
                  className="p-3 my-2 rounded text-black"
                  placeholder="User Name"
                />
                <label className="text-white font-bold">Password</label>
                <input
                  type="password"
                  required
                  className="p-3 my-2 rounded text-black"
                  onChange={handlePasswordChange}
                  placeholder="Password"
                />

                <button
                  type="submit"
                  onClick={handleSubmitButton}
                  className="bg-red-700 py-3 my-6 rounded font-bold px-4"
                >
                  Log in
                </button>
                <div>
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
    </>)
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