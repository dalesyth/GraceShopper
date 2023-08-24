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

// GET item by ID
export async function getItemById(itemId) {
    
    console.log(`itemId from getItemById: ${itemId}`);
    console.log(`API route from getItemById: ${APIURL}/items/${itemId}}`);
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




