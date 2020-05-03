const express = require("express");
const controller = require("./../Controllers/userController");

const router = express.Router();
router.route("/").get(controller.getAllUsers).post(controller.createUser);

router
  .route("/:id")
  .get(controller.getSingleUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;