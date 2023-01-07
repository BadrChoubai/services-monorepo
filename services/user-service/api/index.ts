import express from 'express';
import userController from './user.controller';


const router = express.Router();

router.get<{}, { message: string }>('/', (req, res) => {
  res.json({
    message: 'API Documentation: coming soon',
  });
});

router.use('/', userController);

export default router;