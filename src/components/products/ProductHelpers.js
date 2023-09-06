const APIURL = "http://localhost:3000/api";
import { getItemById } from "../ApiCalls";

export async function loader({ params }) {
  console.log("PARAMS_ITEM: ", params.itemId);
  const products = await getItemById(params.itemId);
  console.log("PRODUCTS: ", products.price);
  return { products };
}

export async function addProduct(
  { title, price, inventory, image_name }
) {
  const fields = { title, price, inventory, image_name };
  try {
    const response = await fetch(`${APIURL}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Create Order Error: ${error}`);
  }
}
export async function updateProduct( id, { title, price, inventory, image_name }) {
  const fields = { title, price, inventory, image_name };
  try {
    const response = await fetch(`${APIURL}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Create Order Error: ${error}`);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${APIURL}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(`result from deleteProduct: ${result}`);
    return result;
  } catch (error) {
    console.error(`Delete Item Error: ${error}`);
  }
}
