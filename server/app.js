import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';

import userRoutes from './routes/api/user';
import clientRoutes from './routes/api/client';
import lockerRoutes from './routes/api/locker';
import authRoutes from './routes/api/auth';

import morgan from 'morgan';

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(cors({origin: true, credentials: true}));
app.use(morgan("dev"));

app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connecting success.")).catch((e)=> console.log(e));

// routes
app.get("/");
app.use("/api/user", userRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/locker", lockerRoutes);
app.use("/api/auth", authRoutes);


export default app;