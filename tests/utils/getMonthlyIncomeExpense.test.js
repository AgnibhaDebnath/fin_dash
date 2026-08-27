import { describe, expect, it } from "vitest";
import { getMonthlyIncomeExpense } from "../../src/utils/dashboard/getMonthlyIncomeExpense.js";
describe("getMonthlyIncomeExpense", () => {
    it("returns empty array when there are no transactions", () => {
        expect(getMonthlyIncomeExpense([])).toEqual([]);
    });

    it("calculates monthly income correctly", () => {
        const transactions = [
            { type: "income", amount: 500, date: `${new Date(2026, 7, 10)}` },
            { type: "income", amount: 400, date: `${new Date(2026, 8, 2)}` },
        ];
        expect(getMonthlyIncomeExpense(transactions)).toEqual([
            { month: "2026-08", income: 500, expense: 0 },
            { month: "2026-09", income: 400, expense: 0 },
        ]);
    });

    it("calculates monthly expense correctly", () => {
        const transactions = [
            { type: "expense", amount: 500, date: `${new Date(2026, 7, 10)}` },
            { type: "expense", amount: 400, date: `${new Date(2026, 8, 2)}` },
        ];
        expect(getMonthlyIncomeExpense(transactions)).toEqual([
            { month: "2026-08", income: 0, expense: 500 },
            { month: "2026-09", income: 0, expense: 400 },
        ]);
    });

    it("calculates monthly income and expense correctly", () => {
        const transactions = [
            { type: "expense", amount: "500", date: `${new Date(2026, 7, 10)}` },
            { type: "expense", amount: "400", date: `${new Date(2026, 8, 2)}` },
            { type: "income", amount: "1000", date: `${new Date(2026, 8, 6)}` },
        ];
        expect(getMonthlyIncomeExpense(transactions)).toEqual([
            { month: "2026-08", income: 0, expense: 500 },
            { month: "2026-09", income: 1000, expense: 400 },
        ]);
    });
});
