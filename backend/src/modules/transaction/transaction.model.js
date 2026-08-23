import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
