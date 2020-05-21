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

module.exports = router;
