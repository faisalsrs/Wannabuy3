const mongoose = require("mongoose");
const requiredMsg = "{PATH} is required.";

const wannabuySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, requiredMsg],
      minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
      unique: true
    },
    condition: {
      type: String,
      required: [true, requiredMsg],
      minlength: [3, "{PATH} must be at least {MINLENGTH} characters."]
    },
    desc: {
      type: String,
      required: [true, requiredMsg],
      minlength: [3, "{PATH} must be at least {MINLENGTH} characters."]
    },
    imageURL: {
      type: String,
      required: [true, requiredMsg],
      minlength: [3, "{PATH} must be at least {MINLENGTH} characters."]
    },
    price: {
      type: Number,
      required: [true, requiredMsg],
      min: [50]
    },
    quantity: {
      type: Number,
      required: [true, requiredMsg],
      min: [1]
    },
    date: {
      type: Date,
      required: [true, requiredMsg]
    }
  },
  { timestamps: true }
);

// register schema with mongoose and create the model, which will create a "post" collection when we insert to it
const Wannabuy = mongoose.model("Wannabuy", wannabuySchema);

module.exports = Wannabuy;
