import express from 'express';
import { getAllCompanies } from '../services/companyService.js';
import { getAllCategories } from '../services/catogoryService.js';
import {getAllProducts ,getProductsByParams,getProductById  } from '../services/product.js';
const productRoutes = express.Router();

productRoutes.get('/', (req, res) => {
  res.send('test Router!');
});

productRoutes.get('/companies', async(req, res) => {
  try {
    const companies = await getAllCompanies();;
    res.json({  companies });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'err' });
  }
})

productRoutes.get('/category', async(req, res)=>{
  try {
    const category = await getAllCategories();;
    res.json({  category });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'err' });
  }
})

productRoutes.get('/products', async(req, res) => {
  try {
    const products = await getAllProducts();;
    res.json({  products });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'err' });
  }
});

productRoutes.get('/company/:company/categories/:categoryname/products/:productid', async(req, res) => {
  const {productid,company,categoryname}=req.params;
  try {
    const product = await getProductById(company,categoryname,productid);
    res.json({  product });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'err' });
  }
})

productRoutes.get('/company/:company/categories/:categoryname/products', async(req, res) => {
  const {productid,company,categoryname}=req.params;
  const {n,page,sort,order} = req.query;
  try {
    const product = await getProductById(company,categoryname,n,page,sort,order);
    res.json({  product });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'err' });
  }
})

export default productRoutes;
