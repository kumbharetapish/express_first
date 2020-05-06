const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ToursModel = require("../../Model/TourModel");

dotenv.config({ path: "./../../config.env" });

const DB = process.env.DATABASE_SERVER.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Database Connection with Server...👌");
  });

// Read File JSON Data
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// Import Data into Database
const importData = async () => {
  try {
    await ToursModel.create(tour);
    console.log("Data Data Successfully import from Database");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
// Delete Data from Database
const deleteData = async () => {
  try {
    await ToursModel.deleteMany();
    console.log("Data Successfully Delete from Database");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
