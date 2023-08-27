const APIURL = "http://localhost:3000/api";

export async function registerUser(username, password) {

  
  console.log(`Inside registerUser from registerAPI.js, UserName: ${username}, password: ${password}`);
  
  try {
    const response = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username, 
          password,
        }
      }),
    });

    const result = await response.json();
    return result.user;
  } catch (error) {
    console.error(`Register Error: ${error}`);
  }
}

