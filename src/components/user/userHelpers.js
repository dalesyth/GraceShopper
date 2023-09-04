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