import { describe, expect, it } from "vitest";
import { getHighestSpendingMonth } from "../../src/utils/dashboard/getHighestSpendingmonth.js";
describe("getHighestSpendingMonth", () => {
    it("returns zero values when there are no transactions", () => {
        expect(getHighestSpendingMonth([])).toEqual({
            highestSpendingPeriod: undefined,
            highestPeriodAmount: 0,
        });
    });

    it("returns zero values when all transactions are income", () => {
        const transactions = [
            { type: "income", amount: 500, date: new Date(2026, 7, 8) },
            { type: "income", amount: 800, date: new Date(2026, 8, 5) },
            { type: "income", amount: 1000, date: new Date(2026, 7, 9) },
        ];
        expect(getHighestSpendingMonth(transactions)).toEqual({
            highestSpendingPeriod: undefined,
            highestPeriodAmount: 0,
        });
    });
    it("calculates highestSpendingPeriod and highestPeriodAmount correctly", () => {
        const transactions = [
            { type: "expense", amount: 500, date: new Date(2026, 7, 8) },
            { type: "expense", amount: 800, date: new Date(2026, 7, 5) },
            { type: "income", amount: 1000, date: new Date(2026, 7, 9) },
            { type: "income", amount: 500, date: new Date(2026, 8, 8) },
            { type: "expense", amount: 800, date: new Date(2026, 8, 5) },
            { type: "expense", amount: 1000, date: new Date(2026, 8, 9) },
        ];
        expect(getHighestSpendingMonth(transactions)).toEqual({
            highestSpendingPeriod: "2026-09",
            highestPeriodAmount: 1800,
        });
    });
});
