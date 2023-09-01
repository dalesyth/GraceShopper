import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "./registerApi.js";

import { useNavigate } from "react-router";
import { input } from "@material-tailwind/react";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip_code] = useState(0);
  const [country, setCountry] = useState("");
  const [shipping_address_1, setShipping_address_1] = useState("");
  const [shipping_address_2, setShipping_address_2] = useState("");
  const [shipping_city, setShipping_city] = useState("");
  const [shipping_state, setShipping_state] = useState("");
  const [shipping_zip_code, setShipping_zip_code] = useState(0);
  const [shipping_country, setShipping_country] = useState("");
  const [error, setError] = useState("");

  const fields = {
    username: username,
    password: password,
    email: email,
    first_name: first_name,
    last_name: last_name,
    address_1: address_1,
    address_2: address_2,
    city: city,
    state: state,
    zip_code: zip_code,
    country: country,
    shipping_address_1: shipping_address_1,
    shipping_address_2: shipping_address_2,
    shipping_city: shipping_city,
    shipping_state: shipping_state,
    shipping_zip_code: shipping_zip_code,
    shipping_country: shipping_country,
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email)
  };

  const handleFirst_name = (event) => {
    setFirst_name(event.target.value);
    console.log(first_name);
  };

  const handleLast_name = (event) => {
    setLast_name(event.target.value);
    console.log(last_name);
  };

  const handleAddress_1 = (event) => {
    setAddress_1(event.target.value)
    console.log(address_1);
  };
    const handleAddress_2 = (event) => {
    setAddress_2(event.target.value)
    console.log(address_2);

  }
  const handleCityChange = (event) => {
    setCity(event.target.value)
    console.log(city);
  }

   const handleStateChange = (event) => {
    setState(event.target.value);
     console.log(state);
   };

   const handleZip_codeChange = (event) => {
    setZip_code(event.target.value)
    console.log(zip_code);
   };

    const handleCountryChange = (event) => {
    setCountry(event.target.value)
    console.log(country);
    };

   const handleShipAddress1Change = (event) => {
    setShipping_address_1(event.target.value);
     console.log(shipping_address_1);
   };

  const handleShipAddress2Change = (event) => {
    setShipping_address_2(event.target.value);
     console.log(shipping_address_2);
   };

   const handleShipCityChange = (event) => {
    setShipping_city(event.target.value);
     console.log(shipping_city);
   };

   const handleShipStateChange = (event) => {
    setShipping_state(event.target.value);
     console.log(shipping_state);
   };

   const handleShipZip_codeChange = (event) => {
    setShipping_zip_code(event.target.value);
    console.log(shipping_zip_code);
   } 

    const handleShipCountryChange = (event) => {
      setShipping_country(event.target.value);
      console.log(shipping_country);
    };

  const handleSubmitButton = async (event) => {
    event.preventDefault();
    console.log("Inside handleSubmitButton");

    // const username = event.target.username.value

    // const userToCreate =  {
    //     username: "albert1",
    //     password: "soxAreGreat",
    //     email: "albert1@myurl.com",
    //     first_name: "albert",
    //     last_name: "soxs",
    //     address_1: "353 My Street",
    //     address_2: "apt. 2",
    //     city: "Hit",
    //     state: "IA",
    //     zip_code: 50613,
    //     country: "USA",
    //     shipping_address_1: "250 Yourstreet",
    //     shipping_address_2: null,
    //     shipping_city: "Mantua",
    //     shipping_state: "UT",
    //     shipping_zip_code: 84324,
    //     shipping_country: "USA"
    //   }

   
      if(!username || !password){
        setError("Please fill out all fields!")
      }
      else if(password.length < 8){
        setError("Passwords must be at least 8 characters!")
      console.log(`Username: ${username}, password: ${password}`);
      console.log("About to register");
      }
      try {
        const user = await registerUser(fields);
        console.log(user);
      if (user) {
       
           localStorage.setItem("token", user.token);
            console.log(localStorage.getItem("token"));
            localStorage.setItem("username", user.user.username);
            console.log(localStorage.getItem("username"));
         
      } else (
        window.alert("Registration failed, please try again.")
      );
      alert("Registration Successful!");
      navigate("/home");
      } catch (error) {
        console.error;
        setError("");
      }
      
     
  };

    return (
      <>
        <div className="flex w-full justify-center">
          <div className="bg-gray-200 w-5/12 px-5 rounded-lg shadow-lg">
            <div>
              <div className="border">
                <label className="font-bold text-xl pb-2 py-4 flex justify-center">
                  To Register: Please Fill out all fields
                </label>

                <form className="w-full flex m-2 flex-col py-2">
                  <label className="font-bold">Username</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Username"
                    onChange={handleUsernameChange}
                  />
                  <label className="font-bold">Password</label>
                  <input
                    className="m-2"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />

                  <label className="font-bold">Email</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Email"
                    onChange={handleEmailChange}
                  ></input>

                  <label className="font-bold">First Name</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="First Name"
                    onChange={handleFirst_name}
                  ></input>

                  <label className="font-bold">Last Name</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Last Name"
                    onChange={handleLast_name}
                  ></input>

                  <label className="font-bold">Address 1</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Address 1"
                    onChange={handleAddress_1}
                  ></input>

                  <label className="font-bold">Address 2</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Address 2"
                    onChange={handleAddress_2}
                  ></input>

                  <label className="font-bold">City</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleCityChange}
                    placeholder="City"
                  ></input>

                  <label className="font-bold">State</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleStateChange}
                    placeholder="State"
                  ></input>

                  <label className="font-bold">Zip Code</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleZip_codeChange}
                    placeholder="Zip Code"
                  ></input>

                  <label className="font-bold">Country</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleCountryChange}
                    placeholder="Country"
                  ></input>

                  <label className="font-bold">Shipping Address 1</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleShipAddress1Change}
                    placeholder="Shipping Address 1"
                  ></input>

                  <label className="font-bold">Shipping Address 2</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleShipAddress2Change}
                    placeholder="Shipping Address 2"
                  ></input>

                  <label className="font-bold">Shipping City</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleShipCityChange}
                    placeholder="Shipping City"
                  ></input>

                  <label className="font-bold">Shipping State</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleShipStateChange}
                    placeholder="Shipping State"
                  ></input>

                  <label className="font-bold">Shipping Zip Code</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleShipZip_codeChange}
                    placeholder="Shipping Zip Code"
                  ></input>

                  <label className="font-bold">Shipping Country</label>
                  <input
                    className="m-2"
                    required
                    onChange={handleShipCountryChange}
                    placeholder="Shipping Country"
                  ></input>

                  <button
                    className="bg-blue-400 flex justify-center text-gray-100 font-bold p-1.5 m-1 rounded-lg hover:bg-blue-600"
                    type="submit"
                    onClick={handleSubmitButton}
                  >
                    Register
                  </button>
                  <button className="flex justify-center bg-gray-300 rounded-lg font-bold p-1.5 m-1 hover:bg-gray-400">
                    <Link to={`/home`}>Cancel</Link>
                  </button>
                </form>
                {error && <p className="text-red-500">{setError}</p>}
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } 

export default Register