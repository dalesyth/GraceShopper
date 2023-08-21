import { useState } from 'react';
import { Link } from "react-router-dom";

import { login } from "./ApiCalls"

const Login = () => {
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
        const result = await login(username, password);
        if (result) {
          console.log(`STORED USERNAME: ${localStorage.getItem("username")}`);
          console.log(`STORED TOKEN: ${localStorage.getItem("token")}`);
        } else {
          console.log("Login Failed!");
        }
      }
      navigate("/Home");
    } catch(error) {
      console.error(`Login Error: ${error}`)
    }
  }

  if(!localStorage.getItem("token")) {
    return <div>Login</div>;
  }
}

export default Login