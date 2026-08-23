import {
    createTransactionService,
    getTransactionsService,
    updateTransactionService,
    deleteTransactionService,
} from "./transaction.service.js";
const createTransactionController = async (req, res) => {
    try {
        await createTransactionService(req.body, req.user);
        res.status(201).json({
            success: true,
            message: "Transaction added successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: true,
            message: "Couldn't add the transaction. Please try again later.",
        });
    }
};

const getTransactionsController = async (req, res) => {
    const type = req.query.type || "all types";
    const category = req.query.category || "all categories";
    const search = req.query.search || "";
    const currentPage = Number(req.query.page);
    const dateFilter = req.query.dateFilter || "this-month";

    try {
        const { totalTransactions, transactions, totalTransactionsAllOverTime } =
            await getTransactionsService(type, category, search, currentPage, dateFilter, req.user);

        res.status(201).json({
            totalTransactions,
            transactions,
            totalTransactionsAllOverTime,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Couldn't load transactions. Please try again later.",
        });
    }
};

const updateTransactionController = async (req, res) => {
    const transactionID = req.params.id;
    try {
        const updatedTransaction = await updateTransactionService(
            req.body,
            transactionID,
            req.user,
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }
        res.status(200).json({
            message: "Transaction updated successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Couldn't update the transaction. Please try again later.",
        });
    }
};

const deleteTransactionController = async (req, res) => {
    const transactionID = req.params.id;
    try {
        const deleted = await deleteTransactionService(transactionID, req.user);
        if (!deleted) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }
        res.status(200).json({
            message: "Transaction deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Couldn't delete the transaction. Please try again later.",
        });
    }
};

export {
    createTransactionController,
    getTransactionsController,
    updateTransactionController,
    deleteTransactionController,
};
