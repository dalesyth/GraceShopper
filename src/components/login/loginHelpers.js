const APIURL = "http://localhost:3000/api";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  console.log("Purged");
};

async function login(username, password) {
  console.log(`ApiCalls, UserName: ${username}, password: ${password}`);
  const fullAPIURL = `${APIURL}/users/login`;
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

    if (result.message === "you're logged in!") {
      const token = result.token;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("username", JSON.stringify(username));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Login Error: ${error}`);
  }
}

export { login, logout };
