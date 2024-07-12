import Company from '../models/companies.js'

async function getAllCompanies() {
    try {
      // Find user in the database
      const company = await Company.find();
  
      // If user not found or password does not match
      return company;
    } catch (error) {
      throw error;
    }
  }

  export {getAllCompanies}