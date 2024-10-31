import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this product.'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock information for this product.'],
    default: 0,
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL for this product.'],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  salePrice: {
    type: Number,
    required: function () { return this.onSale; },
  },
  purchasePrice:{
    type: Number,
    required:true
  }
});

const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;
