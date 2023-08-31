import { Form, useLoaderData } from "react-router-dom";

export default function UpdateProduct(item) {
//  const { item } = useLoaderData();
console.log("PASSED_ITEM:",  item)
  return (
    <Form method="post" id="item-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Product Title"
          aria-label="Product Title"
          type="text"
          name="product"
          defaultValue={item.title}
        />
      </p>
      <p>
        <span>Price</span>
        <input
          placeholder="Price"
          aria-label="Product price"
          type="text"
          name="price"
          defaultValue={`${item.price}`}
        />
      </p>
      <p>
        <span>Inventory</span>
        <input
          placeholder="inventory"
          aria-label="Product inventory"
          type="number"
          name="inventory"
          defaultValue={`${item.inventory}`}
        />
      </p>
      <p>
        <span>Image Name</span>
        <input
          placeholder="image_name"
          aria-label="Product Image"
          type="text"
          name="image_name"
          defaultValue={`${item.image_name}`}
        />
      </p>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}