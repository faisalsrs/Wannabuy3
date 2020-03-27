const Wannabuy = require("../models/wannabuy.model");

module.exports = {
  create(req, res) {
    Wannabuy.create(req.body)
      .then(wannabuy => res.json(wannabuy))
      .catch(err => res.status(400).json(err));
  },
  getAll(req, res) {
    Wannabuy.find()
      .then(wannabuy => res.json(wannabuy))
      .catch(err => res.json(err));
  },
  getOne(req, res) {
    Wannabuy.findById(req.params.id)
      .then(wannabuy => res.json(wannabuy))
      .catch(err => res.json(err));
  },
  delete(req, res) {
    Wannabuy.findByIdAndDelete(req.params.id)
      .then(deletedWannabuy => res.json(deletedWannabuy))
      .catch(err => res.json(err));
  },
  update(req, res) {
    Wannabuy.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    })
      .then(updatedWannabuy => res.json(updatedWannabuy))
      .catch(err => res.status(400).json(err));
  }
};
