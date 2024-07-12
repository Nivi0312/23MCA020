// app.js

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import routes from './routes/routes.js';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routes
app.use('/test', routes);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
