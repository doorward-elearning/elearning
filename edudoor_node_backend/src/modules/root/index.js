import express from 'express';

const RootRouter = express.Router();

RootRouter.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'The API is working',
  });
});

// here you can export a list of routers for different endpoints
export default RootRouter;
