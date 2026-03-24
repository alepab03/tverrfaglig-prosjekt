import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.ts';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running!")
})