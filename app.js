const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/JSON/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours,
    },
  });
};
const getSingleTours = (req, res) => {
  const Id = parseInt(req.params.id);
  const selTours = tours.find((data) => data.id === Id);

  if (!selTours) {
    res.status(404).json({
      status: "fail",
      massage: "Invalid Id",
    });
  }
  res.status(200).json(selTours);
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
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
const updateTours = (req, res) => {
  const Id = parseInt(req.params.id);

  if (Id > tours.length) {
    res.status(404).json({
      status: "fail",
      massage: "Invalid Id",
    });
  }
  res.status(202).json({
    status: "success",
    massage: "data is Update",
  });
};
const deleteTour = (req, res) => {
  const Id = parseInt(req.params.id);

  if (Id > tours.length) {
    res.status(404).json({
      status: "fail",
      massage: "Invalid Id",
    });
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
// app.get("/api/V0/tours", getAllTours);
// app.post("/api/V0/tours", createTour);
app.route("/api/V0/tours").get(getAllTours).post(createTour);

// app.get("/api/V0/tours/:id", getSingleTours);
// app.patch("/api/V0/tours/:id", updateTours);
// app.delete("/api/V0/tours/:id", deleteTour);
app
  .route("/api/V0/tours/:id")
  .get(getSingleTours)
  .patch(updateTours)
  .delete(deleteTour);

app.listen(4500, () => {
  console.log("Server started on 4500");
});
