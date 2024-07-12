// modules/userService.mjs


import Product from '../models/product.js';

async function getAllProducts() {
  try {
    // Find user in the database
    const products = await Product.find();

    // If user not found or password does not match
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByParams(company,category,n,page,sort,order){
  n = parseInt(n);
  page = parseInt(page);

  try {
    const sortOrder = order === 'desc' ? -1 : 1;
    const skip = (page - 1) * n;

    const products = await Product.find({company, category })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(n);

    const totalProducts = await Product.countDocuments({ category });
    const totalPages = Math.ceil(totalProducts / n);

    return ({
      page,
      totalPages,
      totalProducts,
      products,
    });
  } catch (error) {
    throw ({ message: error.message });
  }
}

async function getProductById(company,category,id){
  try {
    const product = await Product.findOne({ company, category, _id:id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   return (product);
  } catch (error) {
    throw ({ message: error.message });
  }
}


export { getAllProducts,getProductsByParams,getProductById };
