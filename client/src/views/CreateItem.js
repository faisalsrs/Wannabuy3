import React, { useState } from "react";

import { navigate } from "@reach/router";

import axios from "axios";

const CreateItem = props => {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [desc, setDesc] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = event => {
    event.preventDefault();

    const newWannabuy = {
      name,
      condition,
      desc,
      imageURL,
      price,
      quantity,
      date
    };

    axios
      .post("http://localhost:8000/api/wannabuys", newWannabuy)
      .then(res => {
        navigate("/wannabuys/");
      })
      .catch(err => {
        console.error(err.response);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <h1>What do you want to buy?</h1>
      <div className="single-container">
        <h2>Post the Item you want to buy!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Item Name: </label>
            <input
              onChange={event => setName(event.target.value)}
              type="text"
            />
            {errors.name ? (
              <span className="error">{errors.name.message}</span>
            ) : (
              ""
            )}
          </div>

          <div>
            <label>Condition: </label>
            <input
              onChange={event => setCondition(event.target.value)}
              type="text"
            />
            {errors.condition ? (
              <span className="error">{errors.condition.message}</span>
            ) : (
              ""
            )}
          </div>

          <div>
            <label>Item Description: </label>
            <textarea
              onChange={event => setDesc(event.target.value)}
              type="text"
            ></textarea>
            {errors.desc ? (
              <span className="error">{errors.desc.message}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Item Image: </label>
            <input
              onChange={event => setImageURL(event.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>Item Price: </label>
            <input
              onChange={event => setPrice(event.target.value)}
              type="text"
              placeholder="minimum $50"
            />
          </div>
          <div>
            <label>Item Quantity: </label>
            <input
              onChange={event => setQuantity(event.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>When do you want it?: </label>
            <input
              onChange={event => setDate(event.target.value)}
              type="date"
            />
          </div>
          <button class="btn btn-primary">Add Item</button>
        </form>
      </div>
    </>
  );
};

export default CreateItem;
