import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "@reach/router";

const Items = props => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/wannabuys")
      .then(res =>
        setItems(
          res.data.sort((a, b) => {
            if (a.date < b.date) return -1;

            if (a.date > b.date) return 1;

            return 0;
          })
        )
      )
      .catch(console.log);

    // the currently connected socket wouldn eed to be made available to this component, meaning move socket to App.js and pass it down as a prop to whatever needs it
    // socket.on("item updated", updatedItem => {
    //   setItems(prevItems => {
    //     prevItems.map(currItem => {
    //       if (currItem._id === updatedItem._id) {
    //         return updatedItem;
    //       } else {
    //         return currItem;
    //       }
    //     });
    //   });
    // });
  }, []);

  //   const handleDelete = idToDel => {
  //     axios
  //       .delete("http://localhost:8000/api/wannabuys/" + idToDel)
  //       .then(res => {
  //         const filteredPosts = items.filter(item => item._id !== idToDel);
  //         setItems(filteredPosts);
  //       })
  //       .catch(console.log);
  //   };

  return (
    <>
      <div>
        <h3>What are you looking to buy?</h3>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Condition</th>
              <th>Item Image</th>
              <th>Date</th>
              <th>Current Bid Price</th>
              <th>Bid</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.condition}</td>
                <td>
                  <img
                    style={{
                      paddingBottom: 20,
                      borderBottom: "2px solid gray"
                    }}
                    width="20%"
                    src={item.imageURL}
                    alt={`${item.name} item`}
                  />
                </td>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={"/wannabuys/" + item._id}>Want to bid?</Link>{" "}
                  {/* <Link to={"/pets/" + pet._id + "/edit"}>Edit</Link> |{" "} */}
                  {/* <button onClick={event => handleDelete(pet._id)}>
                    Adopt
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Items;
