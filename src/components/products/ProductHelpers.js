import { getItemById } from "../ApiCalls";

export async function loader({ params }) {
  console.log("PARAMS_ITEM: ", params.itemId)
  const products = await getItemById( params.itemId );
  console.log("PRODUCTS: ", products.price);
  return { products };

}

export async function updateProduct( id, {title, price, inventory, image_name }) {
  try {
    const response = await fetch(`${APIURL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        title,
        price,
        inventory, 
        image_name,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Create Order Error: ${error}`);
  }
}