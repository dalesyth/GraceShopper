const APIURL = "http://localhost:3000/api";
const token = JSON.parse(localStorage.getItem("token"));

// GET ROUTES

// GET all items
export async function getAllItems() {
  try {
    const response = await fetch(`${APIURL}/items`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET item by ID
export async function getItemById(itemId) {
  try {
    const response = await fetch(`${APIURL}/items/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET user by username
export async function getUserByUsername(username) {
  console.log(`username passed into getUserByUsername: ${username}`);
  try {
    console.log(`username inside Try Catch: ${username}`);
    console.log(`${APIURL}/users/username/${username}`);
    const response = await fetch(`${APIURL}/users/username/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(`result from getUserByUsername: ${result}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function login(username, password) {
  console.log(`ApiCalls, UserName: ${username}, password: ${password}`);
  const fullAPIURL = `${APIURL}/users/login`;
  const body = JSON.stringify({
    username: username,
    password: password,
  });
  console.log(`PASSWORD: ${password} Line: 48`);

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
      window.alert("Login Failed!");
      return false;
    }
  } catch (error) {
    console.error(`Login Error: ${error}`);
  }
}

export async function createNewOrder({ userId, userEmail }) {
  try {
    const response = await fetch(`${APIURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        email: userEmail,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Create Order Error: ${error}`);
  }
}

export async function addItemToOrder({ itemId, orderId, orderPrice, quantity }) {
  try {
    const response = await fetch(`${APIURL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId,
        orderId,
        orderPrice,
        qty: quantity,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Add item to order error: ${error}`);
  }
}
