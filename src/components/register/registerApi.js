const APIURL = "http://localhost:3000/api/users";

export const registerUser = async (...fields) => {
  const username = fields[0].username;
  const password = fields[0].password;
  console.log("Inside registerUser")

console.log(username)
console.log(password);

  try {
    
    const response = await fetch(`${APIURL}/register`, {
     
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields[0]),
      
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Register Error: ${error}`);
  }
}

