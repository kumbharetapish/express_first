const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name must be filled"],
    unique: true,
    trim: true,
  },
  duration: { type: Number, required: true },
  maxGroupSize: { type: Number, required: true },
  difficulty: { type: String, required: true, trim: true },
  description: {
    type: String,
    trim: true,
  },
  price: { type: Number, required: true },
  ratingsAverage: { type: Number, required: true },
  ratingsQuantity: { type: Number, required: true },
  summary: {
    type: String,
    trim: true,
  },

  imageCover: {
    type: String,
  },
  images: {
    type: [String],
    trim: true,
  },
  startDates: {
    type: [Date],
  },
  // ratting: {
  //   type: Number,
  //   required: [true, "Price must be filled"],
  //   default: 3.0,
  // },
});

const ModelName = mongoose.model("UserDataModels", DataSchema);

module.exports = ModelName;
