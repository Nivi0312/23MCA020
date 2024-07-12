import Category from '../models/Category.js'

async function getAllCategories() {
    try {
      // Find user in the database
      const category = await Category.find();
  
      // If user not found or password does not match
      return category;
    } catch (error) {
      throw error;
    }
  }

  export {getAllCategories}