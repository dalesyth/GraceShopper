import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "./registerApi.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(username);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email)
  }
  


  const handleSubmitButton = async (event) => {
    event.preventDefault();
    console.log("Inside handleSubmitButton", username);
    try {
      if(password && username){
      console.log(`Username: ${username}, password: ${password}`);
      console.log("About to register, Register.jsx");
      }
        const result = await registerUser(username, password);
console.log(result);
      if (result) {
        localStorage.setItem("token", result.data.token);
        console.log("token");
        localStorage.setItem("username", result.data.username);
        console.log("username");

        console.log(
          `STORED USERNAME: ${JSON.parse(localStorage.getItem("username"))}`
        );
        console.log(
          `STORED TOKEN: ${JSON.parse(localStorage.getItem("token"))}`
        );

        <Link to={"/Home"}></Link>
      } else {
        window.alert("Register failed, please login");
        console.log("Register failed!");
      }
      // navigate("/Login");
    } catch (error) {
      console.error(`Register Error: ${error}`);
    }
  };

  if (!localStorage.getItem("token")) {
    return (
      <>
        <div>
          <div>
            <div>
              <div>
                <label>Register</label>
                <form className="w-full flex flex-col py-4">
                  <label>Email</label>
                  <input required onChange={handleEmailChange}
                  placeholder="Email"></input>
                  <label>User Name</label>
                  <input
                    type="text"
                    required
                    onChange={handleUsernameChange}
                    placeholder="User Name"
                  />
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    onChange={handlePasswordChange}
                    placeholder="Password"
                  />

                  <button type="submit" onClick={handleSubmitButton}>
                    Register
                  </button>
                  <div>
                    <Link to={`/home`}>Cancel</Link>
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
        <label className="text-red-600 text-5xl">Already Registered!</label>;
      </>
    );
  }
};

export default Register;
