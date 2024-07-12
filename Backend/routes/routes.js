// parentRouter.js

import express from 'express';
import productRoutes from './productRoutes.js'

const routes = express.Router();

// Define routes for the parent router
routes.get('/', (req, res) => {
  res.send('Welcome to the test Router!');
});

// Mount the productentication router under the '/product' path
routes.use('/product', productRoutes);

export default routes;

// /api/