import express from "express"

require('dotenv').config();

import api from './api';
import { userDb as userDbConnection } from './api/user.db';

try {
  userDbConnection.initialize()
} catch (error) {
  console.error(error);
}

const app = express();

app.use(express.json());

app.get<{}, { message: string }>('/', (req, res) => {
  res.status(200).json({
    message: 'User Service',
  });
});

app.use('/api/v1', api);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});