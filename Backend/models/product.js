import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  discount: { type: Number, required: true },
  availability: { type: String, required: true },
  company: { type: String, required: true},
  category: { type: String, required: true}


});

const Product = mongoose.model('Product', productSchema, "Product");

export default Product;
