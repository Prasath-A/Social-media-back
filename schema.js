const mongoose = require("mongoose");

const productschema = mongoose.Schema({
  id: Number,
  title: String,
  content: String,
});
module.exports = mongoose.model("Database", productschema);
