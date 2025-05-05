import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Import routes
import userRouter from './routes/user.routes.js';
app.use("/api/user",userRouter);

export default app;