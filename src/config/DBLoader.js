const mongoose = require("mongoose");
const config = require("./index");

module.exports = async function DBLoader() {
  mongoose.Promise = global.Promise;
  const connection = await mongoose
    .connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("๐ DB loaded and connected!");
    })
    .catch((err) =>
      console.log("๐งจ๐ฅ Could not connect to DB", config.databaseURL)
    );

  return connection?.connection;
};
