const APIURL = "http://localhost:3000/api";

async function registerUser(username, password) {
  console.log(`Inside registerUser from registerAPI.js, UserName: ${username}, password: ${password}`);
  const fullAPIURL = `${APIURL}/users/register`;
  const body = JSON.stringify({
    username: username,
    password: password,
  });

  try {
    const response = await fetch(fullAPIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    const result = await response.json();
    const token = result.token;

    if (result.success) {
    
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("username", JSON.stringify(username));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Register Error: ${error}`);
  }
}

export { registerUser }
