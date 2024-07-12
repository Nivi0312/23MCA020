import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, unique: true, required: true },
});

const Category = mongoose.model('Category', categorySchema, "Category");

export default Category;
