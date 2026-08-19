import { describe, expect, it, vi } from "vitest";
import Transaction from "../../../src/modules/transaction/transaction.model.js";
import {
    createTransactionService,
    getTransactionsService,
} from "../../../src/modules/transaction/transaction.service";

describe("createTransactionService", () => {
    const user = {
        id: "user@003",
    };
    const transactionData = {
        title: "Fuchka",
        type: "expense",
        category: "food",
        amount: 40,
        date: new Date(2026, 7, 16),
    };

    it("creates a transaction successfully ", async () => {
        const createdTransaction = {
            _id: "transaction@001",
            title: "Fuchka",
            type: "expense",
            category: "food",
            amount: 40,
            date: transactionData.date,
            user: user.id,
        };
        vi.spyOn(Transaction, "create").mockResolvedValue(createdTransaction);
        const resullt = await createTransactionService(transactionData, user);
        expect(Transaction.create).toHaveBeenCalledWith({
            ...transactionData,
            user: user.id,
        });
        expect(resullt).toEqual(createdTransaction);
    });
});
describe("getTransactionsService", () => {
    const user = {
        id: "user@003",
    };
    it("returns transactions for the user", async () => {
        const transactions = [
            {
                _id: "transaction@001",
                title: "Fuchka",
                type: "expense",
                category: "food",
                amount: 40,
                user: user.id,
            },
        ];
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue(transactions),
        };

        vi.spyOn(Transaction, "find").mockReturnValue(mockQuery);
        vi.spyOn(Transaction, "countDocuments").mockResolvedValue(1);
        const result = await getTransactionsService(
            "all types",
            "all categories",
            "",
            null,
            null,
            user,
        );
        expect(Transaction.find).toHaveBeenCalledWith({
            user: user.id,
        });
        expect(result.transactions).toEqual(transactions);
        expect(result.totalTransactions).toBe(1);
        expect(result.totalTransactionsAllOverTime).toBe(1);
    });

    it("filters transactions by type", async () => {
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue([]),
        };

        vi.spyOn(Transaction, "find").mockReturnValue(mockQuery);
        vi.spyOn(Transaction, "countDocuments").mockResolvedValue(0);
        await getTransactionsService("expense", "all categories", "", null, null, user);
        expect(Transaction.find).toHaveBeenCalledWith({
            user: user.id,
            type: "expense",
        });
    });
    it("filters transactions by category", async () => {
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue([]),
        };

        vi.spyOn(Transaction, "find").mockReturnValue(mockQuery);
        vi.spyOn(Transaction, "countDocuments").mockResolvedValue(0);
        await getTransactionsService("all types", "food", "", null, null, user);
        expect(Transaction.find).toHaveBeenCalledWith({
            user: user.id,
            category: "food",
        });
    });

    it("filters transactions by search text", async () => {
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue([]),
        };

        vi.spyOn(Transaction, "find").mockReturnValue(mockQuery);
        vi.spyOn(Transaction, "countDocuments").mockResolvedValue(0);
        await getTransactionsService("all types", "all categories", "Fuchka", null, null, user);
        expect(Transaction.find).toHaveBeenCalledWith({
            user: user.id,
            title: {
                $regex: "Fuchka",
                $options: "i",
            },
        });
    });

    it("applies pagination", async () => {
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockReturnThis(),
            skip: vi.fn().mockReturnThis(),
            limit: vi.fn().mockResolvedValue([]),
        };

        vi.spyOn(Transaction, "find").mockReturnValue(mockQuery);
        vi.spyOn(Transaction, "countDocuments").mockResolvedValue(0);
        await getTransactionsService("all types", "all categories", "", 2, null, user);
        expect(mockQuery.skip).toHaveBeenCalledWith(10);
        expect(mockQuery.limit).toHaveBeenCalledWith(10);
    });

    it("filters transactions by date", async () => {
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue([]),
        };

        vi.spyOn(Transaction, "find").mockReturnValue(mockQuery);
        vi.spyOn(Transaction, "countDocuments").mockResolvedValue(0);
        await getTransactionsService("all types", "all categories", "", null, "this-month", user);
        expect(Transaction.find).toHaveBeenCalledWith({
            user: user.id,
            date: {
                $gte: expect.any(Date),
                $lt: expect.any(Date),
            },
        });
    });
});
