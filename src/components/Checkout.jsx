import { useState } from "react";

const Checkout = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleStreetAddress = (event) => {
    setStreetAddress(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleState = (event) => {
    setState(event.target.value);
  };

  const handleBillingName = (event) => {
    setBillingName(event.target.value);
  };

  const handleBillingAddress = (event) => {
    setBillingAddress(event.target.value);
  };

  const handleBillingCity = (event) => {
    setBillingCity(event.target.value);
  };

  const handleBillingState = (event) => {
    setBillingState(event.target.value);
  };

  const handleBillingZipCode = (event) => {
    setBillingZipCode(event.target.value);
  };

  const handleCardNumber = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDate = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCvv = (event) => {
    setCvv(event.target.value);
  };

  const handleZipCode = (event) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="checkout-container">
      <h1 className="font-bold flex justify-center text-3xl">Checkout</h1>
      <div className="checkoutForm grid grid-cols-2">
        <form
          className="mt-12 bg-gray-200 p-2 shadow-lg"
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold">Shipping address</h3>
          <div className="mt-3">
            <input
              className="p-1"
              type="text"
              value={firstName}
              onChange={handleFirstName}
              placeholder="First Name"
              required
            />

            <input
              className="mx-3 p-1"
              type="text"
              value={lastName}
              onChange={handleLastName}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <input
              className="my-3 p-1"
              type="text"
              value={streetAddress}
              onChange={handleStreetAddress}
              placeholder="Street Address"
              required
            />
          </div>
          <div>
            <input
              className="p-1"
              type="text"
              value={city}
              onChange={handleCity}
              placeholder="City"
              required
            />

            <input
              className="mx-3 p-1"
              type="text"
              value={state}
              onChange={handleState}
              placeholder="State"
              required
            />

            <input
              className="mt-3 p-1"
              type="text"
              value={zipCode}
              onChange={handleZipCode}
              placeholder="Zip Code"
              required
            />
          </div>
        </form>
        <form className="mt-12 mx-3 bg-gray-200 p-2 shadow-lg">
          <h3 className="font-bold">Payment Method</h3>
          <div>
            <input
              className="mt-3 p-1"
              type="text"
              value={billingName}
              onChange={handleBillingName}
              placeholder="Billing Name"
              required
            />
          </div>
          <div>
            <input
              className="my-3 p-1"
              type="text"
              value={billingAddress}
              onChange={handleBillingAddress}
              placeholder="Street Address"
              required
            />
          </div>
          <div>
            <input
              className="p-1"
              type="text"
              value={billingCity}
              onChange={handleBillingCity}
              placeholder="City"
              required
            />

            <input
              className="mx-3 p-1"
              type="text"
              value={billingState}
              onChange={handleBillingState}
              placeholder="State"
              required
            />

            <input
              className="mt-3 p-1"
              type="text"
              value={billingZipCode}
              onChange={handleBillingZipCode}
              placeholder="Zip Code"
              required
            />
          </div>
          <div>
            <input
              className="my-3 p-1"
              type="text"
              value={cardNumber}
              onChange={handleCardNumber}
              placeholder="Card Number"
              required
            />
          </div>
          <div>
            <input
              className="p-1"
              type="text"
              value={expirationDate}
              onChange={handleExpirationDate}
              placeholder="Expiration Date"
              required
            />
            <input
              className="mx-3 p-1"
              type="text"
              value={cvv}
              onChange={handleCvv}
              placeholder="CVV"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
