import { Form, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItemById } from "../ApiCalls";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

//////////////////////////////////////////////
const UpdateProduct = () => {
  const { itemId } = useParams();
  console.log("ITEM+ID", itemId)
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getItemDetail = async () => {
      try {
        const product = await getItemById(itemId);
        setItem(product);
      } catch (error) {
        console.error(`Getting Items ERROR: ${error}`);
      }
    };
    getItemDetail(itemId)
  }, [itemId]);

  console.log("ITEM_DETAILS: ", item);
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="detail-container grid grid-cols-2 bg-gray-200 rounded-lg shadow-lg h-2/5 w-4/5">
          <div className="photo-container flex justify-center items-center">
            <img
              src={`../../public/${item.image_name}`}
              alt={item.title}
              className="w-3/4 h-3/4"
            />
          </div>
          <div className="item-details flex justify-center items-center flex-col">
            <Form method="post" id="item-form">
              <div>
                <span className="font-bold pb-2">Title: </span>
                <input
                  placeholder="Product Title"
                  aria-label="Product Title"
                  type="text"
                  name="product"
                  defaultValue={item.title}
                  className="grows text-center w-30"
                />
              </div>
              <div>
                <span className="font-bold pb-2">Price: </span>
                <input
                  placeholder="Price"
                  aria-label="Product price"
                  type="text"
                  name="price"
                  defaultValue={`$${item.price}`}
                />
              </div>
              <div>
                <span className="font-bold pb-2">Inventory: </span>
                <input
                  placeholder="inventory"
                  aria-label="Product inventory"
                  type="number"
                  name="inventory"
                  defaultValue={item.inventory}
                />
              </div>
              <div>
                <span className="font-bold pb-2">Image Name: </span>
                <input
                  placeholder="image_name"
                  aria-label="Product Image"
                  type="text"
                  name="image_name"
                  defaultValue={item.image_name}
                />
              </div>
              <div className="flew-row justify-items-stretch  p-4">
                <button
                  className="bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button className="bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
