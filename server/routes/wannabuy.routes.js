const wannabuyController = require("../controllers/wannabuy.controller");

module.exports = app => {
  app.post("/api/wannabuys", wannabuyController.create);
  app.get("/api/wannabuys", wannabuyController.getAll);
  app.get("/api/wannabuys/:id", wannabuyController.getOne);
  app.delete("/api/wannabuys/:id", wannabuyController.delete);
  app.put("/api/wannabuys/:id", wannabuyController.update);
};
