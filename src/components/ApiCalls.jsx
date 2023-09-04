const APIURL = "http://localhost:3000/api";

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
  // console.log(`username passed into getUserByUsername: ${username}`);
  try {
    console.log(`username passed into getUserByUsername: ${username}`);
    const response = await fetch(`${APIURL}/users/username/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(`Response not okay: ${response.status}`)
      return null;
    }

    const responseText = await response.text();
   
    if (!responseText) {
      console.log(`Empty response from getUserByUsername.`)
      return null;
    }

    

    const result = JSON.parse(responseText);

    console.log(`result from getUserByUsername: `, result)

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET order by userId
export async function getOrderByUserId(userId) {
  console.log(`userId from getOrderByUserId: ${userId}`)
  try {
    const response = await fetch(`${APIURL}/orders/orderuser/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    

    if (!response.ok) {
      console.log(`Response not okay: ${response.status}`);
      return null;
    }

    const responseText = await response.text();

    if (!responseText) {
      console.log(`Empty response from getUserByUserId.`);
      return null;
    }

    const result = JSON.parse(responseText);

    console.log(`result from getUserByUserId: `, result);

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET cart by userId
export async function getCartByUserId(userId) {
  try {
    const response = await fetch(`${APIURL}/cart/${userId}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// POST ROUTES

export async function createNewOrder({ userId, userEmail }) {
  try {
    const response = await fetch(`${APIURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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

export async function addItemToOrder({
  itemId,
  userOrderId,
  orderPrice,
  quantity,
}) {
  try {
    console.log(`itemId from add item to order: ${itemId}`)
    console.log(`userOrderId from addItemToOrder: ${userOrderId}`);
    console.log(`orderPrice from addItemToOrder: ${orderPrice}`);
    console.log(`quantity from addItemToOrder: ${quantity}`);
    const response = await fetch(`${APIURL}/orderitems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId,
        orderId: userOrderId,
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

// DELETE ROUTES

export async function removeItemFromOrder(id) {
  try {
    const response = await fetch(`${APIURL}/orderitems/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(`result from removeItemFromOrder: ${result}`);
    return result;
  } catch (error) {
    console.error(`error removing item from order: ${error}`);
  }
}
 
// PATCH ROUTES

export async function updateQtyInOrder(id, qty) {
  try {
    const response = await fetch(`${APIURL}/orderitems/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qty: qty,
      }),
    });
    const result = await response.json();
    console.log(`result from updateQtyInOrder: ${result}`);
    return result;
  } catch (error) {
    console.error(`error updating qty in cart: ${error}`);
  }
}
