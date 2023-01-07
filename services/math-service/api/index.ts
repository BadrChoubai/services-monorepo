import express from 'express';
import mathController from './math.controller';


const router = express.Router();

router.get<{}, { message: string }>('/', (req, res) => {
  res.json({
    message: 'API Documentation: coming soon',
  });
});

router.use('/math', mathController);

export default router;