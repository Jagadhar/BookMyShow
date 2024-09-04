import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bookingRoutes from './routers/bookingrouter.js';
import uesrRoutes from './routers/userRouter.js';
import 'dotenv/config';


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: true,
}));
app.use(cookieParser());
app.use("/api", bookingRoutes);
app.use("/api",uesrRoutes);

// Connect to MongoDB
mongoose.connect(process.env.mongoose_URL)
.then(() => {
  console.log('Connection Successful to Database');
}).catch(err => {
  console.log('Failed to connect to Database', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, MEAN Stack!');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
