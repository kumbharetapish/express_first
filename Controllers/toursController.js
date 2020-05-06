const express = require("express");
const ToursModel = require("./../Model/TourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/JSON/tours-simple.json`)
// );
// exports.getCheckId = (req, res, next, val) => {
// if (val * 1 > tours.length) {
// return res.status(404).json({
//   status: "fail",
//   massage: "Invalid Id",
// });
// }
// next();
// };
// exports.postCheckBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: "fail",
//       massage: "Missing Name or Price ",
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.query, queryObj);
    // Filter Query
    const queryObj = { ...req.query };
    const excludedFiled = ["short", "limit", "page", "filed"];
    excludedFiled.forEach((el) => delete queryObj[el]);

    // Advance Filter Query
    let strObj = JSON.stringify(queryObj);
    strObj = JSON.parse(
      strObj.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );
    console.log(strObj);

    const query = ToursModel.find(strObj);

    const newTour = await query;
    res.status(200).json({
      status: "success",
      result: newTour.length,
      data: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: "filed",
      massage: "Invalid API Request",
      error: err,
    });
  }
};
exports.getSingleTours = async (req, res) => {
  try {
    const selTours = await ToursModel.findById(req.params.id);
    res.status(200).json({ status: "success", data: selTours });
  } catch (err) {
    res.status(400).json({
      status: "filed",
      massage: "Invalid data id",
      error: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // **********FILE METHOD************//
  // const newId = tours[tours.length - 1].id + 1;
  // const newObject = Object.assign({ id: newId }, req.body);
  // tours.push(newObject);
  // fs.writeFile(
  //   `${__dirname}/data/JSON/tours-simple.json`,
  //   JSON.stringify(tours),
  // (err) => {
  // res.status(201).json({
  //   status: "success",
  //   data: newObject,
  // });
  //   }
  // );
  // const newObject = new Tour ({})
  // newObject.save()

  try {
    const newObject = await ToursModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newObject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "filed",
      massage: "invalid data format",
      error: err,
    });
  }
};

exports.updateTours = async (req, res) => {
  const selObject = await ToursModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true }
  );
  try {
    res.status(202).json({
      status: "success",
      data: {
        tour: selObject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "filed",
      massage: "invalid data format",
      error: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  const selObject = await ToursModel.findByIdAndDelete(req.params.id, req.body);
  try {
    res.status(204).json({
      status: "success",
      data: {
        tour: selObject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "filed",
      massage: "invalid data format",
      error: err,
    });
  }
};
