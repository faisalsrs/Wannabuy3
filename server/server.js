const express = require("express");
const cors = require("cors");
const port = 8000;
const db_name = "wannabuy";
const app = express();
app.use(cors());
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = require("socket.io")(server);
let totalConnections = 0;

require("./config/mongoose.config")(db_name);

//req.body will be undefined without this
app.use(express.json());

// long-form
//const exportedRoutesFunc = require("./routes/pet.routes");
// exportedRoutesFunc(app);

require("./routes/wannabuy.routes")(app);

// const currentBidItem = {};

io.on("connect", socket => {
  // console.log(socket);
  totalConnections++;
  logTotalConnections();

  // emit currentBidItem when socket is connected
  // socket.emit("item updated", currentBidItem);

  // socket.on("new bid", bidAmnt => {
  //   currentBidItem.currentPrice = bidAmnt;

  //   // emit currentBidItem again when it is updated
  //   io.emit("item updated", currentBidItem);
  // });

  socket.on("item updated", updatedItem => {
    io.emit("item updated", updatedItem);
  });

  socket.on("disconnect", () => {
    totalConnections--;
    logTotalConnections();
  });
});

function logTotalConnections() {
  console.log(`New bidder connected. ${totalConnections} bidders connected`);
}
