const express = require("express");
const router = express.Router();
const controller = require("./../Controllers/toursController");

// router.param("id", controller.getCheckId);

router.route("/").get(controller.getAllTours).post(controller.createTour);

router
  .route("/:id")
  .get(controller.getSingleTours)
  .patch(controller.updateTours)
  .delete(controller.deleteTour);

// app.get("/api/V0/tours", getAllTours);
// app.post("/api/V0/tours", createTour);
// app.get("/api/V0/tours/:id", getSingleTours);
// app.patch("/api/V0/tours/:id", updateTours);
// app.delete("/api/V0/tours/:id", deleteTour);

module.exports = router;
