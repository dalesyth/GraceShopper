import { getItemById } from "../ApiCalls";

export async function loader({ params }) {
  console.log("PARAMS_ITEM: ", params.itemId)
  const products = await getItemById( params.itemId );
  console.log("PRODUCTS: ", products.price);
  return { products };

}

xport async function updateProduct({ id, title, price, inventory, image_name }) {
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