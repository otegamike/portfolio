import express from 'express';
import cors from 'cors';
import { connectToDb } from './middleware/connectToDb.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
import projectRoutes from './routes/projectRoutes.js';
import statRoutes from './routes/statRoutes.js';
import adminRoutes from './routes/authenticateAdmin.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(connectToDb);

app.use('/api/projects', projectRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/admin', adminRoutes);

app.get("/api/hello", (req, res) => {
    res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;

