const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
});

categorySchema.virtual('url').get(function () {
  return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model('category', categorySchema);
