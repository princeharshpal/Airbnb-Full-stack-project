const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const modifiedData = initData.data.map((obj) => ({
    ...obj,
    owner: "674b253de1a3cd631afd7735",
  }));
  await Listing.insertMany(modifiedData);
  console.log("data was initialized");
};

initDB();
