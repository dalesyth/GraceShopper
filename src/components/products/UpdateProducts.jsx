import { Form } from "react-router-dom";

export default function UpdateProduct() {
  //const { product } = useLoaderData();

  const product = {
    title: "item",
    price: "$1",
    inventory: "3",
    image_name: "yourimage.img",
  };

  return (
    <Form method="post" id="product-form">
      <p>
        <span>Product:</span>
        <input
          placeholder="product"
          aria-label="Product Name"
          type="text"
          name="product"
          defaultValue={product.title}
        />
      </p>
      <p>
        <span>Price:</span>
        <input
          placeholder="price"
          aria-label="Product Price"
          type="text"
          name="price"
          pattern="^(\{1, 3}(\, \d{3})"
          defaultValue={product.price}
        />
      </p>
      <p>
        <span>Inventory:</span>
        <input
          placeholder="inventory"
          aria-label="Product Inventory On Hand"
          type="text"
          name="price"
          defaultValue={product.inventory}
        />
      </p>
      <p>
        <span>Image Name:</span>
        <input
          placeholder="image name"
          aria-label="Image Name"
          type="text"
          name="imgName"
          defaultValue={product.image_name}
        />
      </p>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}