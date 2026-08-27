import { describe, it, expect } from "vitest";
import { calculateSummary } from "../../src/utils/dashboard/calculateSummary.js";
describe("calculateSummary", () => {
    it("returns zero values when there are no transactions", () => {
        expect(calculateSummary([])).toEqual({
            income: 0,
            expense: 0,
            balance: 0,
        });
    });

    it("calculates total income correctly", () => {
        const transactions = [
            { type: "income", amount: 400 },
            { type: "income", amount: 500 },
        ];
        expect(calculateSummary(transactions)).toEqual({
            income: 900,
            expense: 0,
            balance: 900,
        });
    });
    it("calculates total expense correctly", () => {
        const transactions = [
            { type: "expense", amount: "400" },
            { type: "expense", amount: "500" },
        ];
        expect(calculateSummary(transactions)).toEqual({
            income: 0,
            expense: 900,
            balance: -900,
        });
    });

    it("calculates income,expense and balance correctly", () => {
        const transactions = [
            { type: "expense", amount: "400" },
            { type: "income", amount: "500" },
        ];
        expect(calculateSummary(transactions)).toEqual({
            income: 500,
            expense: 400,
            balance: 100,
        });
    });
});
