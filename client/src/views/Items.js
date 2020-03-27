import React, { useEffect, useState } from "react";
import axios from "axios";

import moment from "moment";
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
      <div class="container">
        <div class="row">
          <h3>What are you looking to buy?</h3>
          <hr />
          <div style={{ textAlign: "center" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Condition</th>
                  <th scope="col">Item Image</th>
                  <th scope="col-sm">Date</th>
                  <th scope="col">Current Bid Price</th>
                  <th scope="col">Bid</th>
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
                        width="150px"
                        src={item.imageURL}
                        alt={`${item.name} item`}
                      />
                    </td>
                    <td>{moment(item.date).format("MMMM D, YYYY")}</td>
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
        </div>
      </div>
    </>
  );
};

export default Items;
