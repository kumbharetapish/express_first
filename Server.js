const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_SERVER.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
//console.log(app.get("env"),"app.get('env')" );
mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("Database Connection with Server.");
  });

// const testUser = new Model.ModelName({
//   name: "Ramu V. Kamwala",
//   price: 3000,
//   ratting: 3.4,
// });

// testUser
//   .save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("error...💥",err.errmsg );
// });

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log("Server started on port " + port + "...!");
});
