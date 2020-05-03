const fs = require("fs");
const express = require("express");
const router = express.Router();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/JSON/tours-simple.json`)
);

exports.getCheckId = (req, res, next, val) => {
  if (val * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      massage: "Invalid Id",
    });
  }
  next();
};

exports.postCheckBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "fail",
      massage: "Missing Name or Price ",
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours,
    },
  });
};
exports.getSingleTours = (req, res) => {
  const selTours = tours.find((data) => data.id === req.params.id * 1);
  res.status(200).json({ status: "success", data: selTours });
};

exports.createTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  const newObject = Object.assign({ id: newId }, req.body);
  tours.push(newObject);
  fs.writeFile(
    `${__dirname}/data/JSON/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: newObject,
      });
    }
  );
};

exports.updateTours = (req, res) => {
  res.status(202).json({
    status: "success",
    massage: "data is Update",
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
