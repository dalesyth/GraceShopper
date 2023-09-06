import { Form, Link } from "react-router-dom";
import { useState } from "react";

import { addProduct } from "./ProductHelpers";

//////////////////////////////////////////////
const AddProduct = () => {
  //console.log("ITEM+ID", itemId);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState(0);
  const [fileName, setFileName] = useState("");

   function setItemDetail ( item ) {
    setTitle(item.title);
    setPrice(`$${item.price}`);
    setInventory(item.inventory);
    setFileName(item.image_name);
  }

  ///////////////////////////////////
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const handlePriceChange = (event) => {
    let inputValue = event.target.value//.replaceAll(
      //"^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:.[0-9]{2})?$", "" );
        
    if (inputValue[0]=== "$"){
      inputValue = Number(inputValue.slice(1));
    } else {
      inputValue = Number(inputValue);
    }
    setPrice(`$${inputValue}`);
    };
  const handleQuantityChange = (event) => {
    setInventory(event.target.value);
  };
  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  ///////////////////////////////
  const handleSave = async (event) => {
    event.preventDefault();
    //strip out $ signb and convert price from string to number
    const newPrice=Number(price.slice(1))
    //validate user has permissions to change product valuess
    const role = JSON.parse(localStorage.getItem("role"));
    //store state in an object to be passed to api.
    const fields = {
      title: title,
      price: newPrice,
      inventory: inventory,
      image_name: fileName,
      };
    if (role === "admin") {
      try {
        //console.log(fields);
        const result = await addProduct(fields);
        console.log("RETURN RESULTS", result)
        setItemDetail(result);

      } catch (error) {
        console.error("Error Saving product: ", error);
      }
    } else {
      alert(
        'You are not logged in as "admin."  Log out and log back in with "admin" credentials.  Have a nice day. :>)'
      );
    }


  };
  ///////////////////////////////
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="detail-container grid grid-cols-2 bg-gray-200 rounded-lg shadow-lg h-2/5 w-10/12 ">
          <div className="photo-container flex justify-center items-center rounded-lg">
            <img
              src={`../../public/${fileName}`}
              alt={title}
              className="w-3/4 h-3/4"
            />
          </div>
          <div className="relative item-detail flex flex-col justify-center items-center rounded-lg">
            <div className="absolute top-0 p-4 left-0 text-pink-600 text-2xl font-bold">
              Add Product
            </div>
            <Form method="post" id="item-form" className="flex  flex-col">
              <div className="flex gap-1 items-center">
                <span className="font-bold pb-2">Title: </span>
                <input
                  placeholder="Product Title"
                  aria-label="Product Title"
                  type="text"
                  name="product"
                  value={title}
                  className="flex-grow pl-2"
                  onChange={handleTitleChange}
                />
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold pb-2">Price: </span>
                <input
                  placeholder="Price"
                  aria-label="Product price"
                  type="text"
                  name="price"
                  value={price}
                  className="flex-grow pl-2"
                  onChange={handlePriceChange}
                />
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold pb-2">Inventory: </span>
                <input
                  placeholder="inventory"
                  aria-label="Product inventory"
                  type="number"
                  name="inventory"
                  value={inventory}
                  className="flex-grow pl-2"
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold pb-2">Image Name: </span>
                <input
                  placeholder="image_name"
                  aria-label="Product Image"
                  type="text"
                  name="image_name"
                  value={fileName}
                  className="flex-grow pl-2"
                  onChange={handleFileNameChange}
                />
              </div>
              <div className="flex flex-row gap-4 ">
                <button
                  className="bg-blue-400 w-1/2 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                  onClick={handleSave}
                >
                  Save
                </button>
                <Link
                  to={`/products`}
                  className="bg-blue-400 w-1/2 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold items-center text-center"
                >
                  Cancel
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
