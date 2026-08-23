import { escapeRegex } from "../../utils/escapeRegex.js";
import Transaction from "./transaction.model.js";

const createTransactionService = async (transactionData, user) => {
    const { title, amount, type, category, date } = transactionData;
    const transaction = await Transaction.create({
        title,
        amount,
        type,
        category,
        date,
        user: user.id,
    });
    return transaction;
};

const getTransactionsService = async (type, category, search, currentPage, dateFilter, user) => {
    const TRANSACTIONS_PER_PAGE = 10;

    const filter = {
        user: user.id,
    };
    if (type && type != "all types") {
        filter.type = type;
    }
    if (category && category != "all categories") {
        filter.category = category;
    }
    if (search?.trim()) {
        const safeSearch = escapeRegex(search.trim());
        filter.title = {
            $regex: safeSearch,
            $options: "i",
        };
    }
    if (dateFilter === "this-month") {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        filter.date = {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
        };
    } else if (dateFilter === "last-month") {
        const now = new Date();
        const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        filter.date = {
            $gte: startOfPreviousMonth,
            $lt: endOfPreviousMonth,
        };
    } else if (dateFilter === "this-week") {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);

        startOfWeek.setDate(today.getDate() - dayOfWeek);
        const endOfWeek = new Date(today);
        startOfWeek.setHours(0, 0, 0, 0);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        filter.date = {
            $gte: startOfWeek,
            $lt: endOfWeek,
        };
    } else if (dateFilter === "this-year") {
        const currenYear = new Date().getFullYear();
        const startOfYear = new Date(Date.UTC(currenYear, 0, 1));
        filter.date = {
            $gte: startOfYear,
        };
    } else if (dateFilter === "last-year") {
        const currenYear = new Date().getFullYear();
        const lastYear = currenYear - 1;

        const startOfCurrentYear = new Date(Date.UTC(currenYear, 0, 1));
        const startOfLastYear = new Date(Date.UTC(lastYear, 0, 1));
        filter.date = {
            $gte: startOfLastYear,
            $lt: startOfCurrentYear,
        };
    }

    let query = Transaction.find(filter).select("-__v").sort({ date: -1, createdAt: -1 }).lean();
    if (currentPage) {
        const skip = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
        query = query.skip(skip).limit(TRANSACTIONS_PER_PAGE);
    }
    const totalTransactionsAllOverTime = await Transaction.countDocuments({
        user: user.id,
    });
    const totalTransactions = await Transaction.countDocuments(filter);
    const transactions = await query;
    return { totalTransactions, transactions, totalTransactionsAllOverTime };
};

const updateTransactionService = async (transaction, transactionID, user) => {
    const { title, amount, type, category, date } = transaction;
    const updatedTransaction = await Transaction.findOneAndUpdate(
        {
            _id: transactionID,
            user: user.id,
        },
        {
            title,
            amount,
            type,
            category,
            date,
        },
        {
            returnDocument: "after",
            runValidators: true,
        },
    );
    return updatedTransaction;
};

const deleteTransactionService = async (transactionID, user) => {
    const result = await Transaction.deleteOne({
        _id: transactionID,
        user: user.id,
    });
    if (result.deletedCount === 0) {
        return null;
    }
    return true;
};
export {
    createTransactionService,
    getTransactionsService,
    updateTransactionService,
    deleteTransactionService,
};
