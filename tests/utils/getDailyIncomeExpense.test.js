import { describe, it, expect } from "vitest";
import { getDailyIncomeExpense } from "../../src/utils/dashboard/getDailyIncomeExpense.js";
describe("getDailyIncomeExpense", () => {
    it("returns empty array when there are no transactions", () => {
        expect(getDailyIncomeExpense([])).toEqual([]);
    });
    it("calculates daily income correctly", () => {
        const transactions = [
            { type: "income", amount: 500, date: `${new Date(2026, 7, 10)}` },
            { type: "income", amount: 400, date: `${new Date(2026, 7, 2)}` },
        ];

        expect(getDailyIncomeExpense(transactions)).toEqual([
            { day: "2026-08-10", income: 500, expense: 0 },
            { day: "2026-08-02", income: 400, expense: 0 },
        ]);
    });

    it("calculates daily expense correctly", () => {
        const transactions = [
            { type: "expense", amount: "500", date: `${new Date(2026, 7, 10)}` },
            { type: "expense", amount: "400", date: `${new Date(2026, 7, 2)}` },
        ];

        expect(getDailyIncomeExpense(transactions)).toEqual([
            { day: "2026-08-10", income: 0, expense: 500 },
            { day: "2026-08-02", income: 0, expense: 400 },
        ]);
    });

    it("calculates daily expense correctly", () => {
        const transactions = [
            { type: "income", amount: "500", date: `${new Date(2026, 7, 10)}` },
            { type: "expense", amount: "500", date: `${new Date(2026, 7, 10)}` },
            { type: "expense", amount: "400", date: `${new Date(2026, 7, 2)}` },
        ];

        expect(getDailyIncomeExpense(transactions)).toEqual([
            { day: "2026-08-10", income: 500, expense: 500 },
            { day: "2026-08-02", income: 0, expense: 400 },
        ]);
    });
});
