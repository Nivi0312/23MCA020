import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: { type: String, unique: true, required: true },
});

const Company = mongoose.model('Company', companySchema, "Company");

export default Company;
