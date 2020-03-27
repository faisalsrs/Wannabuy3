import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

import io from "socket.io-client";

// id prop comes from the URL, see routing :id
const SingleItem = ({ id }) => {
  const [item, setItem] = useState({});
  const [msg, setMsg] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const [socket] = useState(() => io(":8000"));

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/wannabuys/" + id)
      .then(res => {
        setItem(res.data);
        setBidAmount((res.data.price - 1).toFixed(2));
      })
      .catch(err => {
        console.log(err);
        setMsg("Error Retrieving Item");
      });
  }, [id]);

  useEffect(() => {
    // add this listener once so we don't have
    // multiple listeners listening for same event
    socket.on("item updated", updatedItem => {
      setItem(updatedItem);

      // toFixed fixes floating point math imprecision
      setBidAmount((updatedItem.price - 1).toFixed(2));

      if (updatedItem.price === 50) {
        setMsg("Bid Over");
      }
    });

    return () => socket.disconnect(true);
  }, []);

  function handleBidSubmit(event) {
    event.preventDefault();

    if (bidAmount < item.price) {
      if (bidAmount < 50) {
        item.price = 50;
      } else {
        item.price = +bidAmount;
      }

      axios
        .put("http://localhost:8000/api/wannabuys/" + id, item)
        .then(res => {
          socket.emit("item updated", res.data);

          if (res.data.price) {
          }
        })
        .catch(err => {
          console.log("error posting", err);
        });
    }
  }

  //   const handleDelete = idToDel => {
  //     axios
  //       .delete("http://localhost:8000/api/pets/" + idToDel)
  //       .then(() => {
  //         navigate("/pets/");
  //       })
  //       .catch(console.log);
  //   };

  //     axios
  //       .put("http://localhost:8000/wannabuys/items/" + id, item)
  //       .then(res => {
  //         const updatedItem = res.data;
  //         setPet(updatedItem);
  //         setAlreadyVoted(true);
  //       })
  //       .catch(console.log);
  //   };

  if (item === null) {
    return msg;
  }

  return (
    <div>
      {/* {JSON.stringify(item)} */}
      <p>Message: {msg}</p>
      <p>Price {item.price}</p>
      <form onSubmit={handleBidSubmit}>
        <label>Bid Amount: </label>
        <input
          onChange={e => setBidAmount(e.target.value)}
          value={bidAmount}
          type="number"
          step="1"
        />
        <button disabled={item.price <= 50 ? true : false}>Place Bid</button>
      </form>
    </div>
  );

  // return (
  //   <div className="text-center">
  //     <h2>Item Name: {item.name}</h2>
  //     {/* <button class="btn btn-danger" onClick={event => handleDelete(pet._id)}>
  //       Adopt {pet.name}
  //     </button> */}
  //     <div className="single-container">
  //       <p>Condition: {item.condition}</p>
  //       <p>Description {item.desc}</p>
  //       <p>
  //         <img
  //           style={{
  //             paddingBottom: 20,
  //             borderBottom: "2px solid gray"
  //           }}
  //           width="40%"
  //           src={item.imageURL}
  //           alt={`${item.name} item`}
  //         />
  //       </p>
  //       <p>Price:{item.price}</p>
  //       <p>Quantity: {item.quantity} </p>
  //       <p>Date: {item.date} </p>
  //       {/* <button
  //         onClick={event => handleVote(true)}
  //         className="arrow"
  //         class="btn btn-success"
  //       >
  //         {" "}
  //         Like {pet.name}{" "}
  //       </button>
  //       <p>{pet.likeCount}&uarr; likes </p> */}
  //     </div>
  //   </div>
  // );
};

export default SingleItem;
