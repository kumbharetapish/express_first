const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_SERVER.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
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
    console.log("Database Connection with Server...👌");
  });

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name must be filled"],
    unique: true,
  },
  price: { type: Number, default: 3.4 },
  ratting: {
    type: Number,
    require: [true, "Name must be filled"],
  },
});

const ModelName = mongoose.model("UserDataModels", DataSchema);

const testUser = new ModelName({
  name: "Ramu V. Kamwala",
  price: 3000,
  ratting: 3.4,
});

testUser
  .save()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.errmsg, "error...💥");
  });

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log("Server started on port", port);
});
