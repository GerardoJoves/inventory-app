const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  number_in_stock: Number,
});

productSchema.virtual('url').get(function () {
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model('Product', productSchema);
