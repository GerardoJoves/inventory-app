const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  number_in_stock: {
    type: Number,
    default: 0,
  },
  image: {
    url: String,
    file_id: String,
    file_name: String,
  },
});

productSchema.virtual('url').get(function () {
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model('Product', productSchema);
