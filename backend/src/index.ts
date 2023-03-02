import express from 'express';
import api from './routes/api';

const app = express();

app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Armadillo Slay!',
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version
        ? `v${process.env.npm_package_version}`: 'unknown'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});