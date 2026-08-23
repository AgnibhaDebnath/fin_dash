import express from "express";
import transactionFormValidator from "./transaction.validator.js";
import authenticate from "../../middlewares/auth.middleware.js";
import {
    createTransactionController,
    getTransactionsController,
    updateTransactionController,
    deleteTransactionController,
} from "./transaction.controller.js";
const transactionRoutes = express.Router();
transactionRoutes.post("/", transactionFormValidator, authenticate, createTransactionController);
transactionRoutes.get("/", authenticate, getTransactionsController);
transactionRoutes.put("/:id", transactionFormValidator, authenticate, updateTransactionController);
transactionRoutes.delete("/:id", authenticate, deleteTransactionController);

export default transactionRoutes;
