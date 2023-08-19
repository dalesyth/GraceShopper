const APIURL = 'http://localhost:3000/api';

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