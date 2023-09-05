const APIURL = "http://localhost:3000/api";

export async function getAllUsers() {
   try {
      const response = await fetch(`${APIURL}/users`, {
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

// GET user by userId
export async function getUserByUserId(userId) {
  
  try {
    
    const response = await fetch(`${APIURL}/users/${userId}`, {
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
      console.log(`Empty response from getUserByUserId.`)
      return null;
    }

    

    const result = JSON.parse(responseText);

    console.log(`result from getUserByUserId: `, result)

    return result;
  } catch (error) {
    console.error(error);
  }
}

// DELETE user by userId

export async function deleteUser(userId) {
    try {
        const response = await fetch(`${APIURL}/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log(`result from deleteUser: `, result);
        return result;
    } catch (error) {
        console.error(`Delete user error: ${error}`);
    }
}