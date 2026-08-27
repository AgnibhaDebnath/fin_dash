import { describe, expect, it } from "vitest";
import { getHighestSpendingDay } from "../../src/utils/dashboard/getHighestSpendingDay.js";
describe("getHighestSpendingDay", () => {
    it("returns zero values when there are no transactions", () => {
        expect(getHighestSpendingDay([])).toEqual({
            highestSpendingPeriod: undefined,
            highestPeriodAmount: 0,
        });
    });

    it("returns zero values when all transactions are income", () => {
        const transactions = [
            { type: "income", amount: 500, date: new Date(2026, 7, 8) },
            { type: "income", amount: 800, date: new Date(2026, 7, 5) },
            { type: "income", amount: 1000, date: new Date(2026, 7, 9) },
        ];
        expect(getHighestSpendingDay(transactions)).toEqual({
            highestSpendingPeriod: undefined,
            highestPeriodAmount: 0,
        });
    });
    it("calculates highestSpendingPeriod and highestPeriodAmount correctly", () => {
        const transactions = [
            { type: "expense", amount: 500, date: new Date(2026, 7, 8) },
            { type: "expense", amount: 800, date: new Date(2026, 7, 5) },
            { type: "income", amount: 1000, date: new Date(2026, 7, 9) },
        ];
        expect(getHighestSpendingDay(transactions)).toEqual({
            highestSpendingPeriod: "2026-08-05",
            highestPeriodAmount: 800,
        });
    });
});
