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
      console.log("👌 DB loaded and connected!");
    })
    .catch((err) =>
      console.log("🧨🔥 Could not connect to DB", config.databaseURL)
    );

  return connection?.connection;
};
