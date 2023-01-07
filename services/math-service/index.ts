import express from "express"

require('dotenv').config();

import api from './api';

const app = express();

app.use(express.json());

app.get<{}, { message: string }>('/', (req, res) => {
  res.status(200).json({
    message: 'Math Service',
  });
});

app.use('/api/v1', api);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});