import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import transactionRoutes from "./modules/transaction/transaction.route.js";
dotenv.config();
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
export default app;
